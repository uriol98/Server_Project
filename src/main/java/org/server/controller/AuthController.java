package org.server.controller;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.itextpdf.text.DocumentException;
import org.server.entity.ApiResponse;
import org.server.entity.PasswordReset;
import org.server.entity.User;
import org.server.exceptions.EmailAlreadyExistsException;
import org.server.mail.EmailServiceImpl;
import org.server.security.TokenProvider;
import org.server.service.PassowordResetService;
import org.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.net.URI;
import java.time.LocalDate;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    UserService userService;

    @Autowired
    EmailServiceImpl emailService;

    @Autowired
    PassowordResetService passowordResetService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) throws IOException, DocumentException {


            String token = userService.login(loginRequest.email, loginRequest.password);
            return ResponseEntity.ok(new org.server.entity.AuthResponse(token));

    }

    @PostMapping(path = "/signup")
    @ResponseBody
    public ResponseEntity<?> register ( @Valid @RequestBody RegisterUser ru){

        try{
           User result = userService.register(ru.email, passwordEncoder.encode(ru.password), ru.name, ru.surname,
                   ru.dateOfBirth, ru.gender, ru.phoneNumber, ru.address, ru.university, ru.fieldOfStudy, ru.yearGraduation);

           URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/users/me").buildAndExpand(result.get_id()).toUri();
            return ResponseEntity.created(location)
                    .body(new ApiResponse(true, "User registered successfully@"));
        } catch (EmailAlreadyExistsException ex) {
            throw new EmailAlreadyExistsException();
            }
    }

    @PostMapping(path = "/forget")
    @ResponseBody
    public ResponseEntity<?> sendEmailResetPassword(@Valid @RequestBody  Email email){

        String token = userService.generateResetToken(email.email);
        emailService.sendSimpleMessageResetPassword("oriol1998@gmail.com","test",token);
        return ResponseEntity.ok("Message sent to you email account succesfully and the token is:"+token);
    }

    @PostMapping(path = "/reset/{token}")
    @ResponseBody
    public ResponseEntity<?> resetPassword(@PathVariable("token") String token, @Valid @RequestBody Password password){

        userService.resetPassword(token,passwordEncoder.encode(password.password));
        return ResponseEntity.ok(new org.server.entity.ApiResponse(true, "password successfully changed"));
    }

    @PostMapping(path = "/reset")
    @ResponseBody
    public  ResponseEntity<?> checkTokenResetPassword(@Valid @RequestBody Token token){

        PasswordReset p = passowordResetService.checkToken(token.token);
        return ResponseEntity.ok(new org.server.entity.ApiResponse(true,"token found"));
    }

    static class Email{
        @NotNull
        public String email;
    }

    static class Password{
        @NotNull
        public String password;
    }

    static class Token{
        @NotNull
        public String token;
    }

    static class LoginRequest {
        @NotNull
        public String email;
        @NotNull
        public String password;
    }

    static class AuthResponse{
        String accessToken;
        String tokenType = "Bearer";

        AuthResponse(String token){ this.accessToken = token;}

    }

    static class RegisterUser {
        @NotNull
        public  String name;
        @NotNull
        public   String surname;
        @NotNull
        public String email;
        @NotNull
        public String password;
        @NotNull
        public String gender;
        @NotNull
        @JsonFormat(pattern = "dd/MM/yyyy")
        public LocalDate dateOfBirth;
        @NotNull
        public String address;
        @NotNull
        public String university;
        @NotNull
        public  String fieldOfStudy;
        @NotNull
        public String yearGraduation;
        @NotNull
        public String phoneNumber;
    }

}
