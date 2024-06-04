
package com.bot.javabot.repository;

import com.bot.javabot.model.Standup;

import com.bot.javabot.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
@EnableTransactionManagement
public interface StandupRepository extends JpaRepository<Standup,Integer> {
    List<Standup> findByTeamId(int teamId);
    List<Standup> findByDeveloperId(int developerid);

}
