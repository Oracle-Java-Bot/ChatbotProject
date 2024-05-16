package com.bot.javabot.repository;

import com.bot.javabot.model.Task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
@EnableTransactionManagement
public interface TaskRepository extends JpaRepository<Task,Integer> {
    List<Task> findByTeamId(int teamId);
    List<Task> findByDeveloperId(int developerid);

}