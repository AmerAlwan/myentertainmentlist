package com.myentertainmentlist.myEList.services;

import com.myentertainmentlist.myEList.models.User;
import com.myentertainmentlist.myEList.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DefaultUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String identity) throws UsernameNotFoundException {
        User user;
        if(userRepository.existsByUsername(identity)) {
            user = userRepository.findByUsername(identity)
                                    .orElseThrow(() -> new UsernameNotFoundException("User with username \"" + identity + "\" not found!"));
        } else if(userRepository.existsByEmail(identity)) {
            user = userRepository.findByEmail(identity)
                    .orElseThrow(() -> new UsernameNotFoundException("User with email \"" + identity + "\" not found!"));
        } else {
            throw new UsernameNotFoundException("User with username or email \"" + identity + "\" not found!");
        }
        return UserDetailsImpl.build(user);
    }
}
