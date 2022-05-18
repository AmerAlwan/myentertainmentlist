package com.myentertainmentlist.myEList.security.authentication;

import javax.persistence.*;
import java.time.*;
import org.springframework.web.bind.annotation.*;
import java.security.*;
import com.myentertainmentlist.myEList.models.User;

@Entity
@Table(name = "secure_tokens")
public class SecureToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String token;

    @Column(name = "creation_date_time", columnDefinition = "TIMESTAMP",updatable = false)
    private LocalDateTime localDateTime;

    // @Basic signifies that an attribute is to be persisted and a standard mapping is to be used.
    // It has parameters which allow you to specify whether the attribute is to be lazily loaded (fetch) and whether it's nullable (optional).
    // https://stackoverflow.com/questions/1383229/java-persistence-jpa-column-vs-basic
    @Column(updatable = false)
    @Basic(optional = false)
    private LocalDateTime expireAt;

    // ManyToOne = Multiple Rows in this table can be mapped to one tow in another table
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName ="id")
    private User user;

    // @Transient is used to ignore a field to not persist in the database
    @Transient
    private boolean isExpired;


    public SecureToken() {

    }

    public boolean isExpired() {
        return getExpireAt().isBefore(LocalDateTime.now());
    }

    public Long getId() {
        return id;
    }

    public String getToken() {
        return token;
    }

    public LocalDateTime getLocalDateTime() {
        return localDateTime;
    }

    public LocalDateTime getExpireAt() {
        return expireAt;
    }

    public User getUser() {
        return user;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setLocalDateTime(LocalDateTime localDateTime) {
        this.localDateTime = localDateTime;
    }

    public void setExpireAt(LocalDateTime expireAt) {
        this.expireAt = expireAt;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setExpired(boolean expired) {
        isExpired = expired;
    }
}