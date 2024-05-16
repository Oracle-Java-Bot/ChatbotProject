package com.bot.javabot.controller;

import com.bot.javabot.model.Task;
import com.bot.javabot.service.TaskService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Optional;

@RestController
// @CrossOrigin is used because the frontend is running on a different port
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
    @Autowired
    private TaskService taskService;

    // Endpoints
    //Get ALL TASKS
    @GetMapping(value = "/tasks")
    public List<Task> getAll(){
        return taskService.findAll();
    }

    //Task by its id
    @GetMapping(value = "/tasks/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable int id) {
        Optional<Task> task = taskService.findById(id);
        return task.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    //Tasks based on criteria
    //team id
    @GetMapping(value = "/tasks/team/{teamId}")
    public List<Task> getTasksByTeamId(@PathVariable int teamId){
        return taskService.findByTeamId(teamId);
    }

    //developer id
    @GetMapping(value = "/tasks/developer/{developerId}")
    public List<Task> getTasksByDeveloperId(@PathVariable int developerId){
        return taskService.findByDeveloperId(developerId);
    }

    @PostMapping(value = "/tasks")
    public ResponseEntity<Task> createTask(@RequestBody Task task){
        Task createdTask = taskService.save(task);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    //PUT
    @PutMapping(value = "tasks/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable int id, @RequestBody Task task){
        Task updatedTask = taskService.update(id, task); //ENUMS ! (completed at change with status)
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    //DELETE
    @DeleteMapping(value = "/tasks/{id}")
    public ResponseEntity<Task> deleteTask(@PathVariable int id){
        taskService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}