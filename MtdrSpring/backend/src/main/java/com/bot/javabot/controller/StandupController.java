package com.bot.javabot.controller;

import com.bot.javabot.model.Standup;
import com.bot.javabot.model.Task;
import com.bot.javabot.service.StandupService;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins="*")
public class StandupController {
    @Autowired
    private StandupService standupService;

    // Create endpoints
    //GET all standups
    @GetMapping(value = "/standups")
    public List<Standup> getAll(){
        return standupService.findAll();
    }

    // Save standup
    @PostMapping(value = "/standups")
    public ResponseEntity<Standup> createStandup(@RequestBody Standup standup){
        Standup createdStandup = standupService.save(standup);
        return new ResponseEntity<>(createdStandup, HttpStatus.CREATED);
    }

    // GET standup by id
    @GetMapping(value = "/standups/{id}")
    public ResponseEntity<Standup> getStandupById(@PathVariable int id) {
        Optional<Standup> standup = standupService.findById(id);
        return standup.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    //GET standup by team id
    @GetMapping(value = "standups/team/{teamId}")
    public List<Standup> getStandupsByTeamId(@PathVariable int teamId) {
        return standupService.findByTeamId(teamId);
    }

    //GET standup by developer id
    @GetMapping(value = "/standups/developer/{developerId}")
    public List<Standup> getStandupsByDeveloperId(@PathVariable int developerId){
        return standupService.findByDeveloperId(developerId);
    }



}
