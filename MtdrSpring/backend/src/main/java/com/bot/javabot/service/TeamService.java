package com.bot.javabot.service;

import com.bot.javabot.model.Team;
import com.bot.javabot.repository.TeamRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {
    @Autowired
    private TeamRepository teamRepository;
    //Show all tasks
    public List<Team> findAll(){
        List<Team> teams = teamRepository.findAll();
        return teams;
    }

    //save
    public Team save(Team team){
        return teamRepository.save(team);
    }
}