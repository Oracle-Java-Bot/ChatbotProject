
package com.bot.javabot.repository;

import com.bot.javabot.model.Team;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.transaction.Transactional;

@Repository
@Transactional
@EnableTransactionManagement
public interface TeamRepository extends JpaRepository<Team,Integer> {
}