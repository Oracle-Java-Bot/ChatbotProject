package com.bot.javabot.service;

import com.bot.javabot.model.Standup;
import com.bot.javabot.repository.StandupRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StandupService {
    @Autowired
    private StandupRepository standupRepository;
    //Show all tasks
    public List<Standup> findAll(){
        List<Standup> standups = standupRepository.findAll();
        return standups;
    }
}