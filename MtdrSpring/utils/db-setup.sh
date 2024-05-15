#!/bin/bash
# Copyright (c) 2022 Oracle and/or its affiliates.
# Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.

# Fail on error
set -e


# Create Object Store Bucket (Should be replaced by terraform one day)
while ! state_done OBJECT_STORE_BUCKET; do
  echo "Checking object storage bucket"
#  oci os bucket create --compartment-id "$(state_get COMPARTMENT_OCID)" --name "$(state_get RUN_NAME)"
  if oci os bucket get --name "$(state_get RUN_NAME)-$(state_get MTDR_KEY)"; then
    state_set_done OBJECT_STORE_BUCKET
    echo "finished checking object storage bucket"
  fi
done


# Wait for Order DB OCID
while ! state_done MTDR_DB_OCID; do
  echo "`date`: Waiting for MTDR_DB_OCID"
  sleep 2
done


# Get Wallet
while ! state_done WALLET_GET; do
  echo "creating wallet"
  cd $MTDRWORKSHOP_LOCATION
  mkdir wallet
  cd wallet
  oci db autonomous-database generate-wallet --autonomous-database-id "$(state_get MTDR_DB_OCID)" --file 'wallet.zip' --password 'Welcome1' --generate-type 'ALL'
  unzip wallet.zip
  cd $MTDRWORKSHOP_LOCATION
  state_set_done WALLET_GET
  echo "finished creating wallet"
done


# Get DB Connection Wallet and to Object Store
while ! state_done CWALLET_SSO_OBJECT; do
  echo "grabbing wallet"
  cd $MTDRWORKSHOP_LOCATION/wallet
  oci os object put --bucket-name "$(state_get RUN_NAME)-$(state_get MTDR_KEY)" --name "cwallet.sso" --file 'cwallet.sso'
  cd $MTDRWORKSHOP_LOCATION
  state_set_done CWALLET_SSO_OBJECT
  echo "done grabbing wallet"
done


# Create Authenticated Link to Wallet
while ! state_done CWALLET_SSO_AUTH_URL; do
  echo "creating authenticated link to wallet"
  ACCESS_URI=`oci os preauth-request create --object-name 'cwallet.sso' --access-type 'ObjectRead' --bucket-name "$(state_get RUN_NAME)-$(state_get MTDR_KEY)" --name 'mtdrworkshop' --time-expires $(date '+%Y-%m-%d' --date '+7 days') --query 'data."access-uri"' --raw-output`
  state_set CWALLET_SSO_AUTH_URL "https://objectstorage.$(state_get REGION).oraclecloud.com${ACCESS_URI}"
  echo "done creating authenticated link to wallet"
done


# Give DB_PASSWORD priority
while ! state_done DB_PASSWORD; do
  echo "Waiting for DB_PASSWORD"
  sleep 5
done


# Create Inventory ATP Bindings
while ! state_done DB_WALLET_SECRET; do
  echo "creating Inventory ATP Bindings"
  cd $MTDRWORKSHOP_LOCATION/wallet
  cat - >sqlnet.ora <<!
WALLET_LOCATION = (SOURCE = (METHOD = file) (METHOD_DATA = (DIRECTORY="/mtdrworkshop/creds")))
SSL_SERVER_DN_MATCH=yes
!
  if kubectl create -f - -n mtdrworkshop; then
    state_set_done DB_WALLET_SECRET
  else
    echo "Error: Failure to create db-wallet-secret.  Retrying..."
    sleep 5
  fi <<!
apiVersion: v1
data:
  README: $(base64 -w0 README)
  cwallet.sso: $(base64 -w0 cwallet.sso)
  ewallet.p12: $(base64 -w0 ewallet.p12)
  keystore.jks: $(base64 -w0 keystore.jks)
  ojdbc.properties: $(base64 -w0 ojdbc.properties)
  sqlnet.ora: $(base64 -w0 sqlnet.ora)
  tnsnames.ora: $(base64 -w0 tnsnames.ora)
  truststore.jks: $(base64 -w0 truststore.jks)
kind: Secret
metadata:
  name: db-wallet-secret
!
  cd $MTDRWORKSHOP_LOCATION
done


# DB Connection Setup
export TNS_ADMIN=$MTDRWORKSHOP_LOCATION/wallet
cat - >$TNS_ADMIN/sqlnet.ora <<!
WALLET_LOCATION = (SOURCE = (METHOD = file) (METHOD_DATA = (DIRECTORY="$TNS_ADMIN")))
SSL_SERVER_DN_MATCH=yes
!
MTDR_DB_SVC="$(state_get MTDR_DB_NAME)_tp"
TODO_USER=TODOUSER
ORDER_LINK=ORDERTOINVENTORYLINK
ORDER_QUEUE=ORDERQUEUE


# Get DB Password
while true; do
  if DB_PASSWORD=`kubectl get secret dbuser -n mtdrworkshop --template={{.data.dbpassword}} | base64 --decode`; then
    if ! test -z "$DB_PASSWORD"; then
      break
    fi
  fi
  echo "Error: Failed to get DB password.  Retrying..."
  sleep 5
done


# Wait for DB Password to be set in Order DB
while ! state_done MTDR_DB_PASSWORD_SET; do
  echo "`date`: Waiting for MTDR_DB_PASSWORD_SET"
  sleep 2
done


# Order DB User, Objects
while ! state_done TODO_USER; do
  echo "connecting to mtdr database"
  U=$TODO_USER
  SVC=$MTDR_DB_SVC
  sqlplus /nolog <<!
WHENEVER SQLERROR EXIT 1
connect admin/"$DB_PASSWORD"@$SVC
CREATE USER $U IDENTIFIED BY "$DB_PASSWORD" DEFAULT TABLESPACE data QUOTA UNLIMITED ON data;
GRANT CREATE SESSION, CREATE VIEW, CREATE SEQUENCE, CREATE PROCEDURE TO $U;
GRANT CREATE TABLE, CREATE TRIGGER, CREATE TYPE, CREATE MATERIALIZED VIEW TO $U;
GRANT CONNECT, RESOURCE, pdb_dba, SODA_APP to $U;

CREATE TABLE TODOUSER.Teams (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
CREATE SEQUENCE autoincremento_teams_id
START WITH 1
INCREMENT BY 1;
CREATE OR REPLACE TRIGGER trigger_teams
BEFORE INSERT ON Teams
FOR EACH ROW
BEGIN
    SELECT autoincremento_teams_id.NEXTVAL INTO :NEW.id FROM DUAL;
END;


CREATE TABLE TODOUSER.Users (
    id INT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    team_id INT NOT NULL,
    role VARCHAR2(20) NOT NULL,

    FOREIGN KEY (team_id) REFERENCES teams(id),
    CONSTRAINT chk_role CHECK (role IN ('manager', 'developer'))
);
CREATE SEQUENCE autoincremento_users_id
START WITH 1
INCREMENT BY 1;
CREATE OR REPLACE TRIGGER trigger_users_id
BEFORE INSERT ON Users
FOR EACH ROW
BEGIN
    SELECT autoincremento_users_id.NEXTVAL INTO :NEW.id FROM DUAL;
END;

CREATE TABLE TODOUSER.Tasks (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR2(4000) NOT NULL,
    priority VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    team_id INT NOT NULL,
    developer_id INT NOT NULL,
    FOREIGN KEY (team_id) REFERENCES TEAMS(id),
    FOREIGN KEY (developer_id) REFERENCES Users(id),
    CONSTRAINT chk_priority_tasks CHECK (priority IN ('low', 'medium', 'high')),
    CONSTRAINT chk_status_tasks CHECK (status IN ('pending', 'ongoing', 'completed'))
);
CREATE SEQUENCE autoincremento_tasks_id
START WITH 1
INCREMENT BY 1;
CREATE OR REPLACE TRIGGER trigger_tasks
BEFORE INSERT ON Tasks
FOR EACH ROW
BEGIN
    SELECT autoincremento_tasks_id.NEXTVAL INTO :NEW.id FROM DUAL;
END;
CREATE OR REPLACE TRIGGER trg_update_timestamp
BEFORE UPDATE ON Tasks
FOR EACH ROW
BEGIN
    :NEW.updated_at := CURRENT_TIMESTAMP;
END;
CREATE OR REPLACE TRIGGER trigger_actualizar_completed_at
BEFORE UPDATE OF status ON Tasks
FOR EACH ROW
BEGIN
    IF :NEW.status = 'completed' AND :OLD.status != 'completed' THEN
        :NEW.completed_at := CURRENT_TIMESTAMP;
    END IF;
END;

CREATE TABLE TODOUSER.Standup (
    id INT PRIMARY KEY,
    progress VARCHAR2(4000) NOT NULL,
    plans VARCHAR2(4000) NOT NULL,
    challenge VARCHAR2(4000) NOT NULL,
    support VARCHAR2(4000) NOT NULL,
    time_standup TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    team_id INT NOT NULL,
    developer_id INT NOT NULL,
    FOREIGN KEY (team_id) REFERENCES Teams(id),
    FOREIGN KEY (developer_id) REFERENCES Users(id)
);
CREATE SEQUENCE autoincremento_standup_id
START WITH 1
INCREMENT BY 1;
CREATE OR REPLACE TRIGGER trigger_standup
BEFORE INSERT ON Standup
FOR EACH ROW
BEGIN
    SELECT autoincremento_standup_id.NEXTVAL INTO :NEW.id FROM DUAL;
END;

INSERT INTO TODOUSER.Teams (name)
VALUES ('Equipo Super Chido');
INSERT INTO TODOUSER.Users (email, password, name, team_id, role )
VALUES ('correo@outlook.com','contraseña','JP', 1, 'developer');
INSERT INTO TODOUSER.Users (email, password, name, team_id, role )
VALUES ('email@hotmail.com','password','JJJ', 1, 'manager');
VALUES ('correo@outlook.com','contraseña','JP', 1);
INSERT INTO TODOUSER.Tasks (title, description, priority, team_id, developer_id)
VALUES ('tasks demo', 'comprobar que funcione la table de tasks', 'high', 1, 1);
insert into TODOUSER.STANDUP (progress, plans, challenge, support, team_id, DEVELOPER_ID)
values('Vamos bien', 'Terminar base de datos y usuario', 'Es dificil oracle sql', 'Otros teams nos ayudan', 1,1);

commit;
!
  state_set_done TODO_USER
  echo "finished connecting to database and creating attributes"
done
# DB Setup Done
state_set_done DB_SETUP