package com.bot.javabot.service;

import com.bot.javabot.exceptions.TaskNotFoundException;
import com.bot.javabot.model.Task;
import com.bot.javabot.repository.TaskRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    //Show all tasks
    public List<Task> findAll(){
        List<Task> tasks = taskRepository.findAll();
        return tasks;
    }

    //Save task (POST)
    public Task save(Task task) {
        return taskRepository.save(task);
    }

    //Find by ID
    public Optional<Task> findById(int taskId){
        return taskRepository.findById(taskId);
    }

    //find by Team ID
    public List<Task> findByTeamId(int teamId){
        return taskRepository.findByTeamId(teamId);
    }

    //find by Developer ID
    public List<Task> findByDeveloperId(int developerId){
        return taskRepository.findByDeveloperId(developerId);
    }

    //Update
    public Task update(int taskId, Task updatedTask) {
        Optional<Task> optionalTTask = taskRepository.findById(taskId);
        if (optionalTTask.isPresent()){
            Task existingTask = optionalTTask.get();
            //Update fields of existing Task with optional
            existingTask.setTitle(updatedTask.getTitle());
            existingTask.setDescription(updatedTask.getDescription());
            existingTask.setPriority(updatedTask.getPriority());
            existingTask.setStatus(updatedTask.getStatus());
            existingTask.setCreated_at(updatedTask.getCreated_at());
            existingTask.setCompleted_at(updatedTask.getCompleted_at());
            existingTask.setTeam(updatedTask.getTeam());
            existingTask.setDeveloper(updatedTask.getDeveloper());

            //Save and return updated task
            return taskRepository.save(existingTask);
        } else {
            //given TaskId not found
            throw new TaskNotFoundException("Task not found with ID: " + taskId);
        }
    }

    public void delete(int taskId){
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if(optionalTask.isPresent()){
            taskRepository.delete(optionalTask.get());
        } else {
            throw new TaskNotFoundException("Task not found with ID: " + taskId);
        }
    }
}