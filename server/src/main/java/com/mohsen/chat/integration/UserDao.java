package com.mohsen.chat.integration;

import com.mohsen.chat.Exception.UserNotFoundException;
import com.mohsen.chat.domain.User;
import com.mohsen.chat.integration.accessingdatamysql.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class UserDao {

    @Autowired
    private UserRepository userRepository;

    public User save( User user ) {
        return userRepository.save( user );
    }

    public List<User> findAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    public User findOneByEmail( String email ) throws Exception {
        List<User> users = userRepository.findByEmail( email );
        if (users.size() == 0) {
            throw new UserNotFoundException( "User or password is wrong." );
        }
        User user = users.get( 0 );
        return user;
    }

    public Optional<User> findById( Integer id ) {
        return userRepository.findById( id );
    }

    public long deleteByEmail( String email ) {
        return userRepository.deleteByEmail( email );
    }
}
