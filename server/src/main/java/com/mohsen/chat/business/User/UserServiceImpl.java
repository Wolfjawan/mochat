package com.mohsen.chat.business.User;

import com.mohsen.chat.Exception.UserNotFoundException;
import com.mohsen.chat.domain.User;
import com.mohsen.chat.integration.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User saveUser(User user) {
        user.setCreatedAt(LocalDateTime.now());
        return userDao.save(user);
    }

    @Override
    public Optional<User> findUser(int id) {
        return userDao.findById(id);
    }

    @Override
    public Integer login(String email, String password) throws Exception {
        User resUser = userDao.findOneByEmail(email);
        String userPassword = resUser.getPassword();
        Boolean checkPass = passwordEncoder.matches( password, userPassword);
        if (checkPass) {
            Integer id = resUser.getId();
            return id;
        } else {
            throw new UserNotFoundException("User or password is wrong.");
        }
    }

    @Override
    public List<User> getAllUsers() {
        return (List<User>) userDao.findAllUsers();
    }

    @Override
    public long deleteByEmail(String email) {
     return userDao.deleteByEmail( email );
    }
}
