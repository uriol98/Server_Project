package org.server.controller;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.itextpdf.text.DocumentException;
import org.server.entity.User;
import org.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Collection;

@RequestMapping(path= "/users")
@Controller
public class UserController {


    @Autowired
    UserService userService;



    @GetMapping(path = "/")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ResponseBody
    public Collection<User> getUsers(){
        return userService.getUsers();
    }

    @GetMapping(path = "/me")
    @ResponseBody
    public User getCurrentUser(HttpServletRequest req){
        return userService.getCurrentUser(req);
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
    public ResponseEntity<?> updateUser( HttpServletRequest req,@RequestBody UpdateProfile up){
        userService.updateProfile(req,up.name,up.surname,up.dateOfBirth,up.gender,up.phoneNumber,up.address, up.university,up.fieldOfStudy,up.yearGraduation);
        return ResponseEntity.ok(new org.server.entity.ApiResponse(true, "Profile Updated"));
    }

    @GetMapping (path = "/generatepdf")
    @ResponseBody
    @PreAuthorize("hasAnyRole('USER','EXTRAORDINARY')")
    public void generatePDF(HttpServletRequest req, HttpServletResponse response) throws IOException, DocumentException {
        response.setContentType("application/pdf");
        userService.generatePdf( response, req);

    }

    @PostMapping("/image")
    public ResponseEntity<?> addProfileImage(@RequestParam (name = "file") MultipartFile file, Model model,HttpServletRequest req) throws IOException {
        userService.addProfileImage(file,req);
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
        public String university;
        @NotNull
        public  String fieldOfStudy;
        @NotNull
        public String yearGraduation;
        @NotNull
        public String phoneNumber;
    }

}


