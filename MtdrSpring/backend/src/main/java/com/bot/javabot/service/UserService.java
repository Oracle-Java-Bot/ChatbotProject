package com.bot.javabot.service;

import com.bot.javabot.model.User;
import com.bot.javabot.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    //Show all tasks
    public List<User> findAll(){
        List<User> users = userRepository.findAll();
        return users;
    }
}