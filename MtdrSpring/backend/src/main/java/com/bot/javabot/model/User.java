package com.bot.javabot.model;

import javax.persistence.*;

@Entity
@Table(name = "Users")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int  id;

    @Column(name = "email")
    String email;

    @Column(name = "password")
    String password;

    @Column(name = "team_id")
    int team_id;

    @Column(name = "role")
    String role;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getTeam_id() {
        return team_id;
    }

    public void setTeam_id(int team_id) {
        this.team_id = team_id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User{"+
        ", id='" + id + '\'' +
        ", email='" + email + '\'' +
        ", password='" + password + '\'' +
        ", team_id='" + team_id + '\'' +
        ", role='" + role +
        '}';
    }
}