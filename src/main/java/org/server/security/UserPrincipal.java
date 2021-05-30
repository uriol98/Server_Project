package org.server.security;

import org.server.entity.User;
import org.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserPrincipal implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
         Optional<User> u = userRepository.findByEmail(username);

        if (!u.isPresent()) {
            throw new UsernameNotFoundException("User '" + username + "' not found");
        }

        final User user = u.get();
        return org.springframework.security.core.userdetails.User//
                .withUsername(username)//
                .password(user.getPassword())//
                .authorities(user.getRoles())//
                .accountExpired(false)//
                .accountLocked(false)//
                .credentialsExpired(false)//
                .disabled(false)//
                .build();
    }




}

