package com.bot.javabot.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Users")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int  id;

    @Column(name = "name")
    String name;

    @Column(name = "email")
    String email;

    @Column(name = "password")
    String password;

    // @Column(name = "team_id")
    // int team_id;
    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @Column(name = "role")
    String role;

    //MappedBy = The relationship is owned by Task Entity; mapped by "developer" field in Task
    @OneToMany(mappedBy = "developer")
    private List<Task> tasks;

    //Getters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Team getTeam() {
        return team;
    }

    public void setTeam_id(Team team) {
        this.team = team;
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
        ", name='" + name + '\'' +
        ", email='" + email + '\'' +
        ", password='" + password + '\'' +
        ", team_id='" + team + '\'' +
        ", role='" + role +
        '}';
    }
}