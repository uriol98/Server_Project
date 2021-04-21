package org.server.controller;


import com.fasterxml.jackson.annotation.JsonFormat;
import org.server.controller.exceptions.BadRequestException;
import org.server.entity.ApiResponse;
import org.server.entity.User;
import org.server.security.TokenProvider;
import org.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
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

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.email,
                        loginRequest.password
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.createToken(authentication);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping(path = "/signup")
    @ResponseBody
    public ResponseEntity<?> register ( @Valid @RequestBody RegisterUser ru){

        if(userService.crud().findByEmail(ru.email).isPresent())
            throw new BadRequestException("Email address already in use.");
       User result = userService.register(ru.username,ru.email,passwordEncoder.encode(ru.password),ru.name,ru.surname,ru.nationality,ru.dateOfBirth);

       URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/users/me").buildAndExpand(result.get_id()).toUri();
        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "User registered successfully@"));
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
        public String username;
        @NotNull
        public String email;
        @NotNull
        public String password;
        @NotNull
        public  String name;
        @NotNull
        public   String surname;
        @NotNull
        public String nationality;
        @NotNull
        @JsonFormat(pattern = "dd-MM-yyyy")
        public LocalDate dateOfBirth;
    }

}
