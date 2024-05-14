package com.bot.javabot.service;

import com.bot.javabot.model.Task;
import com.bot.javabot.repository.TaskRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    //Show all tasks
    public List<Task> findAll(){
        List<Task> tasks = taskRepository.findAll();
        return tasks;
    }
}