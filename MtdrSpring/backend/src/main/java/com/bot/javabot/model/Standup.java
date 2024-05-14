
package com.bot.javabot.model;

import java.sql.Timestamp;

import javax.persistence.*;

@Entity
@Table(name = "Standups")
public class Standup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int  id;

    @Column(name = "progress")
    String progress;

    @Column(name = "plans")
    String plans;

    @Column(name = "challenge")
    String challenge;

    @Column(name = "support")
    String support;

    @Column(name = "time_standup")
    Timestamp time_standup;
    
    @Column(name = "team_id")
    int team_id;

    @Column(name = "developer_id")
    int developer_id;

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

    public int getTeam_id() {
        return team_id;
    }

    public void setTeam_id(int team_id) {
        this.team_id = team_id;
    }

    public int getDeveloper_id() {
        return developer_id;
    }

    public void setDeveloper_id(int developer_id) {
        this.developer_id = developer_id;
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
        ", team_id='" + team_id + '\'' +
        ", developer_id='" + developer_id + '\'' +
        '}';
    }
}