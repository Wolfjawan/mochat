package com.mohsen.chat.integration.accessingdatamysql;

import com.mohsen.chat.domain.User;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete
// Spring data SQL Query docs--->  https://docs.spring.io/spring-data/jpa/docs/current/reference/html
public interface UserRepository extends CrudRepository<User, Integer> {

    //    @Query("select u.id, u.email, u.name from List<User> u")
    List<User>findAll();

    List<User> findByEmail(String email);

    @Transactional
    long deleteByEmail(String email);
}
