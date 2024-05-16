package com.bot.javabot.service;

import com.bot.javabot.exceptions.UserNotFoundException;
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

    //Get By Id
    public User getUserById(int userId){
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));
    }

    //Save
    public User createUser(User user){
        return userRepository.save(user);
    }
}