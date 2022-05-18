package com.myentertainmentlist.myEList.models;

import com.myentertainmentlist.myEList.models.medialist.MediaList;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

//import com.myentertainmentlist.myEList.security.authentication.SecureToken;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "account_verified")
    private boolean accountVerified;

    @OneToMany(mappedBy = "user")
    private Set<MediaList> medialists = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

//    // Map this one row to multiple rows in another table. Mapped by has to be what the name of the User variable is in SecureToken
//    @OneToMany(mappedBy = "user")
//    private Set<SecureToken> tokens;

    public User() {
    }

    public User(String firstName, String lastName, String username, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.accountVerified = false;
    }

    public boolean isAccountVerified() {
        return accountVerified;
    }

    public long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public Set<MediaList> getMedialists() {
        return medialists;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setAccountVerified(boolean accountVerified) {
        this.accountVerified = accountVerified;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public void setMedialists(Set<MediaList> medialists) {
        this.medialists = medialists;
    }
}