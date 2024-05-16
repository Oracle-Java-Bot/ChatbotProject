package com.bot.javabot.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Teams")

public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int  id;

    @Column(name = "name")
    String name;

    //MappedBy = The relationship is owned by Task Entity; mapped by "team" field in Task
    @OneToMany(mappedBy = "team")
    private List<Task> tasks;

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

    @Override
    public String toString() {
        return "Team{"+
        ", id='" + id + '\'' +
        ", name='" + name + '\'' +
        '}';
    }
}