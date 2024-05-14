package com.bot.javabot.controller;

import com.bot.javabot.model.User;
import com.bot.javabot.service.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    // Create endpoints 
    @GetMapping(value = "/users")
    public List<User> getAll(){
        return userService.findAll();
    }
}
