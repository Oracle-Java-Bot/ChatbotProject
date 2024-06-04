package com.bot.javabot.service;

import com.bot.javabot.model.Standup;
import com.bot.javabot.repository.StandupRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StandupService {
    @Autowired
    private StandupRepository standupRepository;
    //Show all tasks
    public List<Standup> findAll(){
        List<Standup> standups = standupRepository.findAll();
        return standups;
    }

    //Save (POST)
    public Standup save(Standup standup){
        return standupRepository.save(standup);
    }

    //Find by ID
    public Optional<Standup> findById(int standupId){
        return standupRepository.findById(standupId);
    }

    //Find by Team ID
    public List<Standup> findByTeamId(int teamId){
        return standupRepository.findByTeamId(teamId);
    }

    //Find by Developer ID
    public List<Standup> findByDeveloperId(int developerId){
        return standupRepository.findByDeveloperId(developerId);
    }


}