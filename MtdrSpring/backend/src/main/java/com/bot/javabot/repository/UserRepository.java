
package com.bot.javabot.repository;

import com.bot.javabot.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.transaction.Transactional;

@Repository
@Transactional
@EnableTransactionManagement
public interface UserRepository extends JpaRepository<User,Integer> {
    //User findByEmailAndPassword(String email, String password);

    User findByEmail(String email);
}