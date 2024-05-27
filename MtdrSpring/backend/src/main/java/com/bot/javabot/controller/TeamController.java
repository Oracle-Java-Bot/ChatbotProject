package com.bot.javabot.controller;

import com.bot.javabot.model.Team;
import com.bot.javabot.service.TeamService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@CrossOrigin(origins="*")
public class TeamController {
    @Autowired
    private TeamService teamService;

    //Endpoints
    //ALL TEAMS
    @GetMapping(value = "/teams")
    public List<Team> getAll(){
        return teamService.findAll();
    }

    //Post
}