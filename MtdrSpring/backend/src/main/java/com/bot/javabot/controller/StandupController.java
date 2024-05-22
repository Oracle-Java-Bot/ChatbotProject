package com.bot.javabot.controller;

import com.bot.javabot.model.Standup;
import com.bot.javabot.service.StandupService;
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
    @GetMapping(value = "/standups")
    public List<Standup> getAll(){
        return standupService.findAll();
    }
}
