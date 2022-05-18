package com.myentertainmentlist.myEList.repositories;

import com.myentertainmentlist.myEList.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByFirstName(String firstName);
    Optional<User> findByLastName(String lastName);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findById(String id);
    Boolean existsByFirstName(String firstName);
    Boolean existsByLastName(String lastName);
    Boolean existsByUsername(String Username);
    Boolean existsByEmail(String email);
    List<User> findByFirstNameContaining(String firstName);
    List<User> findByLastNameContaining(String lastName);
    List<User> findByUsernameContaining(String username);
    List<User> findByEmailContaining(String email);
    List<User> findByIdContaining(String id);
}