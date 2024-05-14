package com.bot.javabot.controller;

import com.bot.javabot.model.Task;
import com.bot.javabot.service.TaskService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@RestController
public class TaskController {
    @Autowired
    private TaskService taskService;

    // Create endpoints 
    @GetMapping(value = "/tasks")
    public List<Task> getAll(){
        return taskService.findAll();
    }
}
