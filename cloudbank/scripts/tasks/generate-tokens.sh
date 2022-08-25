#!/bin/bash

# Generate Tokens
PYTHON_FUNCTION=$CB_STATE_DIR/tasks/generate.py

# check if this script needs to run again
COMPLETED_BEFORE=$(state_get .state.tokens.SET | jq -e 'select(.!=null)')
if [ -n "$COMPLETED_BEFORE" ]; then
  echo "SKIPPED."
  exit 0;
fi;

# create tokens
UNIQUE_OCIR_TOKEN="$(python $PYTHON_FUNCTION 8)"
state_set '.lab.ocir_unique_identifier |= $VAL' "$UNIQUE_OCIR_TOKEN"

CREATE_BRANCH_TOKEN="$(python $PYTHON_FUNCTION)"
state_set '.lab.tokens.create_branch_webhook.id |= $VAL' 'cbworkshop-create-branch-token'
state_set '.lab.tokens.create_branch_webhook.secret |= $VAL' "$CREATE_BRANCH_TOKEN"

DELETE_BRANCH_TOKEN="$(python $PYTHON_FUNCTION)"
state_set '.lab.tokens.delete_branch_webhook.id |= $VAL' 'cbworkshop-delete-branch-token'
state_set '.lab.tokens.delete_branch_webhook.secret |= $VAL' "$DELETE_BRANCH_TOKEN"

PUSH_BRANCH_TOKEN="$(python $PYTHON_FUNCTION)"
state_set '.lab.tokens.push_branch_webhook.id |= $VAL' 'cbworkshop-push-token'
state_set '.lab.tokens.push_branch_webhook.secret |= $VAL' "$PUSH_BRANCH_TOKEN"

# mark done
state_set '.state.tokens.SET |= $VAL' "$( date '+%F_%H:%M:%S' )"
echo 'DONE'