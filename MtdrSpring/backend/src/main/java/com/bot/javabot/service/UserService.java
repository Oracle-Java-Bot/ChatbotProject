package com.bot.javabot.service;

import com.bot.javabot.exceptions.UserNotFoundException;
import com.bot.javabot.model.Team;
import com.bot.javabot.model.User;
import com.bot.javabot.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    //Hashing
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
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

    //Save without Hashing
    /*public User createUser(User user){
        return userRepository.save(user);
    }*/

    //Save with Hashing
    public User createUser(User user){
        String plainPassword = user.getPassword();
        String hashedPassword = bCryptPasswordEncoder.encode(plainPassword);
        user.setPassword(hashedPassword);
        return userRepository.save(user);
    }

    //Get By Email and Password (NO HASHING)
    /*public User getUserByEmailAndPassword(String email, String password){
        return userRepository.findByEmailAndPassword(email, password);
    }*/

    //GET By Email and Password (HASHED)
    public User getUserByEmailAndPassword(String email, String plainPassword){
        User user = userRepository.findByEmail(email);
        if(user != null && bCryptPasswordEncoder.matches(plainPassword, user.getPassword())){
            return user;
        }
        return null;
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