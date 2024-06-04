package com.bot.javabot.controller;

import com.bot.javabot.exceptions.UserNotFoundException;
import com.bot.javabot.model.User;
import com.bot.javabot.service.UserService;

import oracle.jdbc.proxy.annotation.Post;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins="*")
public class UserController {
    @Autowired
    private UserService userService;

    //Endpoints
    @GetMapping(value = "/users")
    public List<User> getAll(){
        return userService.findAll();
    }

    //Get User By id
    @GetMapping(value = "/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") int id){
        User user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    //POST
    @PostMapping(value = "/users")
    public ResponseEntity<User> createUser(@RequestBody User user){
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }

    //Get User By email and Password
    @GetMapping(value = "/users/{email}/{password}")

    
    public ResponseEntity<User> getUserByEmailAndPassword(@PathVariable("email") String email, @PathVariable("password") String password){
        User user = userService.getUserByEmailAndPassword(email, password);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    //GET team's name
    @GetMapping(value = "/users/{id}/team_name")
    public ResponseEntity<String> getUserTeamName(@PathVariable int id){
        try{
            String teamName = userService.getTeamNameByUserId(id);
            if(teamName != null){
                return new ResponseEntity<>(teamName, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("User does not belong to any team", HttpStatus.OK);
            }
        } catch (UserNotFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}