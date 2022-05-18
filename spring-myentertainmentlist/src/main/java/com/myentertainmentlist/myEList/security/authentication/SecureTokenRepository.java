package com.myentertainmentlist.myEList.security.authentication;

import java.util.List;

import org.springframework.data.jpa.repository.*;

import com.myentertainmentlist.myEList.security.authentication.SecureToken;


public interface SecureTokenRepository extends JpaRepository<SecureToken, Long> {
    SecureToken findByToken(String token);
}