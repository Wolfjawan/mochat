package com.mohsen.chat.presentation;


import com.mohsen.chat.business.User.UserService;
import com.mohsen.chat.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(method = {RequestMethod.POST}, value = "/register")
    public ResponseEntity<User> saveUser( @RequestBody User user ) {
        user.setPassword( passwordEncoder.encode( user.getPassword() ) );
        User resUser = userService.saveUser( user );
        return new ResponseEntity<>( resUser, HttpStatus.CREATED );
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/user/{id}")
    public ResponseEntity<Optional<User>> findUser( @PathVariable("id") int id ) {
        Optional<User> resUser = userService.findUser( id );
        return new ResponseEntity<>( resUser, HttpStatus.OK );
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/users")
    public ResponseEntity<List<User>> loadUsers() {
        List<User> resUsers = userService.getAllUsers();
        return new ResponseEntity<>( resUsers, HttpStatus.OK );
    }

    @RequestMapping(method = {RequestMethod.DELETE}, value = "/user")
    public ResponseEntity deleteByEmail(
            @RequestParam("email") String email
    ) {
        long deleteRecords = userService.deleteByEmail( email );
        return new ResponseEntity( deleteRecords, HttpStatus.OK );
    }
}
