package com.bot.javabot.service;

import com.bot.javabot.exceptions.UserNotFoundException;
import com.bot.javabot.model.Team;
import com.bot.javabot.model.User;
import com.bot.javabot.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    //Get By Email and Password
    public User getUserByEmailAndPassword(String email, String password){
        return userRepository.findByEmailAndPassword(email, password);
    }


    /*
    //GET team's name
    public String getTeamNameByUserId(int userId){
        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            Team team = user.getTeam();
            return team != null ? team.getName() : null;
        } else {
            throw new UserNotFoundException("User not found with ID: " + userId);
        }
    }*/
}