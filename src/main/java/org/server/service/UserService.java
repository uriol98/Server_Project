package org.server.service;


import org.server.controller.exceptions.BadRequestException;
import org.server.controller.exceptions.ServiceException;
import org.server.entity.User;
import org.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserRepository crud(){
        return userRepository;
    }

    public User matchPassword(String email, String password) {

        Optional<User> u = userRepository.findByEmail(email);

        if (!u.isPresent()) throw new ServiceException("User does not exists");

        User user = u.get();

        if (user.getPassword().equals(password))
            return user;
        else
            throw new ServiceException("Password does not match");
    }

    public User register(String username, String email, String password, String name, String surname, String nationality, LocalDate dateOfBirth) {

        List<User> uEmail = new ArrayList<>(); //= userRepository.findByEmail(email);
        if (uEmail.size() > 0)
            throw new BadRequestException("Email already exist");


        List<User> uUsername = new ArrayList<>();//userRepository.findByUsername(username);
        if (uUsername.size() > 0)
            throw new BadRequestException("Username already exists");

        User nu = new User(username,password,email,name,surname,nationality,dateOfBirth);
        userRepository.save(nu);
        return nu;
    }

    public List<User> getUsers(){
        ArrayList<User> llista = (ArrayList<User>) userRepository.findAll();
        return llista;
    }
}
