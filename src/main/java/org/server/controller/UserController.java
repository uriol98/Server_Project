package org.server.controller;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.itextpdf.text.DocumentException;
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

import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.time.LocalDate;

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

    @PostMapping(path = "/update")
    @ResponseBody
    @PreAuthorize("hasAnyRole('USER','EXTRAORDINARY')")
    public ResponseEntity<?> updateUser( @CurrentUser UserPrincipal userPrincipal,@RequestBody UpdateProfile up){
        userService.updateProfile(userPrincipal,up.name,up.surname,up.dateOfBirth,up.gender,up.phoneNumber,up.address);
        return ResponseEntity.ok(new org.server.entity.ApiResponse(true, "Profile Updated"));
    }

    @GetMapping (path = "/generatepdf")
    @ResponseBody
    @PreAuthorize("hasAnyRole('USER','EXTRAORDINARY')")
    public void generatePDF(@CurrentUser UserPrincipal userPrincipal, HttpServletResponse response) throws IOException, DocumentException {
        response.setContentType("application/pdf");
        userService.generatePdf(userPrincipal, response);

    }

    @PostMapping("/image")
    @PreAuthorize("hasAnyRole('USER','EXTRAORDINARY')")
    public ResponseEntity<?> addProfileImage(@RequestParam (name = "file") MultipartFile file, Model model, @CurrentUser UserPrincipal userPrincipal) throws IOException {
        userService.addProfileImage(file,userPrincipal);
        return ResponseEntity.ok(new org.server.entity.ApiResponse(true, "Profile image updated"));
    }


    static class UpdateProfile{

        @NotNull
        public  String name;
        @NotNull
        public   String surname;
        @NotNull
        public String gender;
        @NotNull
        @JsonFormat(pattern = "dd/MM/yyyy")
        public LocalDate dateOfBirth;
        @NotNull
        public String address;
        @NotNull
        public String phoneNumber;
    }

}


