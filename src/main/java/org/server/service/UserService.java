package org.server.service;


import org.server.entity.PasswordReset;
import org.server.entity.User;
import org.server.exceptions.BadCredentialsException;
import org.server.exceptions.EmailAlreadyExistsException;
import org.server.exceptions.EntityNotFound;
import org.server.repository.PasswordResetRepository;
import org.server.repository.UserRepository;
import org.server.security.TokenProvider;
import org.server.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

   @Autowired
   private PassowordResetService passowordResetService;

    @Autowired
    TokenProvider tokenProvider;


    @Autowired
    private PasswordResetRepository passwordResetRepository;


    public UserRepository crud(){
        return userRepository;
    }

    public String login(String email, String password) throws BadCredentialsException {
            try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            return tokenProvider.createToken(email, userRepository.findByEmail(email).get().getRoles());
            } catch (AuthenticationException ex){
                throw new BadCredentialsException();
            }

    }

    public User register(String email, String password, String name, String surname, LocalDate dateOfBirth, String gender, String phoneNumber, String address) throws EmailAlreadyExistsException {

        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent())
            throw new EmailAlreadyExistsException();

        User nu = new User(email, password, name, surname, dateOfBirth, gender, phoneNumber, address);
        userRepository.save(nu);
        return nu;
    }

    public List<User> getUsers(){
        ArrayList<User> llista = (ArrayList<User>) userRepository.findAll();
        return llista;
    }

    public String generateResetToken(String email){

        Optional<User> user = userRepository.findByEmail(email);
        if(!user.isPresent()) throw new EntityNotFound();
        return passowordResetService.generateResetPasswordToken(email);


    }

    public void resetPassword(String token, String password){
        PasswordReset pr = passowordResetService.checkToken(token);
        Optional<User> u = userRepository.findByEmail(pr.getEmail());
        User user = u.get();
        user.setPassword(password);
        userRepository.save(user);
        pr.deactivatePasswordReset();
        passwordResetRepository.save(pr);

    }

    public User getCurrentUser(UserPrincipal userPrincipal){
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new EntityNotFound());
    }
}
