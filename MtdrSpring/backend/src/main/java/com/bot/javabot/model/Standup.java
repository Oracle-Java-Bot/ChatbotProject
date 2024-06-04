
package com.bot.javabot.model;

import java.sql.Timestamp;

import javax.persistence.*;

@Entity
@Table(name = "Standups")
public class Standup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int  id;

    @Column(name = "progress") //Lo que se hizo hoy
    String progress;

    @Column(name = "plans") //Lo que se hará mañana
    String plans;

    @Column(name = "challenge")
    String challenge;

    @Column(name = "support")
    String support;

    @Column(name = "time_standup")
    Timestamp time_standup;

    //Timestamp Management
    //onCreate is called automatically by JPA when it's persisted (Saved)
    //Standup.save(task)
    @PrePersist
    protected void onCreate() {
        time_standup = new Timestamp(System.currentTimeMillis());
    }

    /*@Column(name = "team_id")
   int team;*/
    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;
    //Many tasks to one Team

    /*@Column(name = "developer_id")
    int developer;*/
    @ManyToOne
    @JoinColumn(name = "developer_id")
    private User developer;
    //Many developers to one team

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProgress() {
        return progress;
    }

    public void setProgress(String progress) {
        this.progress = progress;
    }

    public String getPlans() {
        return plans;
    }

    public void setPlans(String plans) {
        this.plans = plans;
    }

    public String getChallenge() {
        return challenge;
    }

    public void setChallenge(String challenge) {
        this.challenge = challenge;
    }

    public String getSupport() {
        return support;
    }

    public void setSupport(String support) {
        this.support = support;
    }

    public Timestamp getTime_standup() {
        return time_standup;
    }

    public void setTime_standup(Timestamp time_standup) {
        this.time_standup = time_standup;
    }

    //Team model datatype
    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    //User model datatype
    public User getDeveloper() {
        return developer;
    }

    public void setDeveloper(User developer) {
        this.developer = developer;
    }

    @Override
    public String toString() {
        return "Standup{"+
        ", id='" + id + '\'' +
        ", progress='" + progress + '\'' +
        ", plans='" + plans + '\'' +
        ", challenge='" + challenge + '\'' +
        ", support='" + support + '\'' +
        ", time_standup='" + time_standup + '\'' +
        ", team_id='" + team + '\'' +
        ", developer_id='" + developer + '\'' +
        '}';
    }
}