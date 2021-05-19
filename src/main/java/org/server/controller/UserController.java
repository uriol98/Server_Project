package org.server.controller;


import org.server.entity.User;
import org.server.security.CurrentUser;
import org.server.security.UserPrincipal;
import org.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.io.IOException;

@RequestMapping(path= "/users")
@Controller
public class UserController {


    @Autowired
    UserService userService;



    @GetMapping(path = "/me")
    @PreAuthorize("hasAnyRole('USER','EXTRAORDINARY')")
    @ResponseBody
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal){
        return userService.getCurrentUser(userPrincipal);
    }

    @GetMapping(path = "/verify/{token}")
    @ResponseBody
    @PreAuthorize("hasAnyRole('USER','EXTRAORDINARY')")
    public ResponseEntity<?> verifyEmail(@PathVariable (name = "token") String token){

        userService.verifyEmail(token);
        return ResponseEntity.ok(new org.server.entity.ApiResponse(true, "Email verified"));
    }

    @PostMapping("/image")
    @PreAuthorize("hasAnyRole('USER','EXTRAORDINARY')")
    public ResponseEntity<?> addProfileImage(@RequestParam (name = "file") MultipartFile file, Model model, @CurrentUser UserPrincipal userPrincipal) throws IOException {
        userService.addProfileImage(file,userPrincipal);
        return ResponseEntity.ok(new org.server.entity.ApiResponse(true, "Profile image updated"));
    }


    static class File{
        @NotNull
        public MultipartFile file;
    }


}


