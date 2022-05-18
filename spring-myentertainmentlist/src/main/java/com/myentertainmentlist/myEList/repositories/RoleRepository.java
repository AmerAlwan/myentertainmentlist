package com.myentertainmentlist.myEList.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.myentertainmentlist.myEList.models.Role;
import com.myentertainmentlist.myEList.enums.UserRole;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(UserRole name);
}