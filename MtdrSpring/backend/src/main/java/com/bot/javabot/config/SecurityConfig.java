package com.bot.javabot.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http
                .csrf().disable() //CSRF for siplicity
                .httpBasic().disable() //Http basic auth
                .authorizeRequests()
                .anyRequest().permitAll(); //Allow db requests
    }
}
