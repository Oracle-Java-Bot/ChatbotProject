package com.bot.javabot.controller;

import com.bot.javabot.model.Team;
import com.bot.javabot.service.TeamService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
public class TeamController {
    @Autowired
    private TeamService userService;

    // Create endpoints 
    @GetMapping(value = "/teams")
    public List<Team> getAll(){
        return userService.findAll();
    }
}
