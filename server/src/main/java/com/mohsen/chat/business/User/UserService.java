package com.mohsen.chat.business.User;

import com.mohsen.chat.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    public User saveUser(User user);
    public Optional<User> findUser(int id);
    public Integer login(String email, String password) throws Exception;
    public List<User> getAllUsers();
    public long deleteByEmail(String email);
}
