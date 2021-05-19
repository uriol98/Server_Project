package org.server.service;


import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.server.entity.PasswordReset;
import org.server.entity.User;
import org.server.entity.VerifyEmailEntity;
import org.server.exceptions.BadCredentialsException;
import org.server.exceptions.EmailAlreadyExistsException;
import org.server.exceptions.EntityNotFound;
import org.server.mail.EmailService;
import org.server.repository.PasswordResetRepository;
import org.server.repository.UserRepository;
import org.server.repository.VerifyEmailRepository;
import org.server.security.TokenProvider;
import org.server.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    private VerifyEmailRepository verifyEmailRepository;

    @Autowired
    EmailService emailService;

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
        VerifyEmailEntity verifyEmailEntity = new VerifyEmailEntity(email);
        verifyEmailRepository.save(verifyEmailEntity);
        userRepository.save(nu);
        emailService.sendSimpleMessageResetPassword(email,"test",verifyEmailEntity.getToken());
        return nu;
    }

    public List<User> getUsers(){
        ArrayList<User> llista = (ArrayList<User>) userRepository.findAll();
        return llista;
    }

    public String generateResetToken(String email){

        Optional<User> user = userRepository.findByEmail(email);
        if(!user.isPresent()) throw new EntityNotFound();
        String token = passowordResetService.generateResetPasswordToken(email);
        emailService.sendSimpleMessageResetPassword(email,"Reset password",token);
        return token;


    }

    public void resetPassword(String token, String password){
        PasswordReset pr = passowordResetService.checkToken(token);
        Optional<User> u = userRepository.findByEmail(pr.getEmail());
        User user = u.get();
        user.setPassword(password);
        userRepository.save(user);
        passwordResetRepository.delete(pr);

    }

    public User getCurrentUser(UserPrincipal userPrincipal){
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new EntityNotFound());
    }

    public void verifyEmail(String token){

        Optional<VerifyEmailEntity> vf = verifyEmailRepository.findByToken(token);
        if(!vf.isPresent()) throw new EntityNotFound();

        VerifyEmailEntity verifyEmailEntity = vf.get();
        Optional<User> u = userRepository.findByEmail(verifyEmailEntity.getEmail());
        User user = u.get();
        user.setEmailVerified(true);
        userRepository.save(user);
        //verifyEmailRepository.delete(verifyEmailEntity);

    }

    public void addProfileImage( MultipartFile file, UserPrincipal userPrincipal) throws IOException {

        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new EntityNotFound());
        user.setImage(
                new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        userRepository.save(user);

    }

}
