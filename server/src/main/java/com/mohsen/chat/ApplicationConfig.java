package com.mohsen.chat;

import com.mohsen.chat.business.JokeService;
import com.mohsen.chat.business.Message.MessageService;
import com.mohsen.chat.business.Message.MessageServiceImpl;
import com.mohsen.chat.business.User.UserService;
import com.mohsen.chat.business.User.UserServiceImpl;
import com.mohsen.chat.createverifytokens.JWTDemo;
import com.mohsen.chat.integration.MessageDao;
import com.mohsen.chat.integration.UserDao;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class ApplicationConfig {
    @Bean
    MessageService messageService() {
        return new MessageServiceImpl();
    }
    @Bean
    MessageDao messageDao() {
        return new MessageDao();
    }
    @Bean
    UserService userService() {
        return new UserServiceImpl();
    }
    @Bean
    UserDao userDao() {
        return new UserDao();
    }
    @Bean
    JWTDemo jwtDemo() {
        return new JWTDemo();
    }
    @Bean
    JokeService jokeService(){
        return new JokeService();
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder;
    }
}
