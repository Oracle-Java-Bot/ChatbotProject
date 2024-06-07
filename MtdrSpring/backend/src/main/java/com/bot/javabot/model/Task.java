package com.bot.javabot.model;

import java.sql.Timestamp;
import java.time.ZonedDateTime;
import javax.persistence.*;

@Entity
@Table(name = "Tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column(name = "title")
    String title;

    @Column(name = "description")
    String description;

    @Column(name = "priority")
    String priority;

    @Column(name = "status")
    String status;

    @Column(name = "created_at")
    Timestamp created_at;

     @Column(name = "updated_at")
    Timestamp updated_at;

    @Column(name = "completed_at")
    Timestamp completed_at;

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

    //Timestamp Management
    //onCreate is called automatically by JPA when it's persisted (Saved)
    //taskService.save(task)
    @PrePersist
    protected void onCreate() {

        created_at = new Timestamp(System.currentTimeMillis());
        updated_at = new Timestamp(System.currentTimeMillis());
    }

    //onUpdate is called automatically just before an existing task is updated in the database
    //taskService.update(id, task)
    @PreUpdate
    protected void onUpdate(){
        updated_at = new Timestamp(System.currentTimeMillis());
        //Current time
    }

    //Getters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }

    public Timestamp getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(Timestamp updated_at) {
        this.updated_at = updated_at;
    }

    public Timestamp getCompleted_at() {
        return completed_at;
    }

    public void setCompleted_at(Timestamp completed_at) {
        this.completed_at = completed_at;
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
        return "Task{"+
        ", id='" + id + '\'' +
        ", description='" + description + '\'' +
        ", priority='" + priority + '\'' +
        ", status='" + status + '\'' +
        ", created_at='" + created_at + '\'' +
        ", updated_at='" + updated_at + '\'' +
        ", completed_at='" + completed_at + '\'' +
        ", team='" + team + '\'' +
        ", developer='" + developer +
        '}';
    }


}