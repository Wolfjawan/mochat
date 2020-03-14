package com.mohsen.chat.presentation;

import com.mohsen.chat.business.User.UserService;
import com.mohsen.chat.createverifytokens.JWTDemo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private JWTDemo jwtDemo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(method = {RequestMethod.GET}, value = "/login")
    public ResponseEntity<String> login(
            @RequestHeader final String email,
            @RequestHeader final String password
    ) throws Exception {
        Integer id = null;
        try {
            if(email.isEmpty()){
                return new ResponseEntity( "Email cannot be empty.", HttpStatus.NOT_FOUND );
            }
            if(password.isEmpty()){
                return new ResponseEntity( "Password cannot be empty.", HttpStatus.NOT_FOUND );
            }
            id = userService.login( email, password );
        } catch (final Exception e) {
            e.printStackTrace();
            return new ResponseEntity( e.getMessage(), HttpStatus.NOT_FOUND );
        }
        final String userId = Integer.toString( id );
        final String token = jwtDemo.createJWT( userId, "/login", 100000000 );
        return new ResponseEntity( token, HttpStatus.OK );
    }
}
