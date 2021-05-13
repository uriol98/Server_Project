package org.server.controller;


import org.server.entity.User;
import org.server.security.CurrentUser;
import org.server.security.UserPrincipal;
import org.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@RequestMapping(path= "/users")
@Controller
public class UserController extends BaseController {


    @Autowired
    UserService userService;



    @GetMapping(path = "/me")
    @PreAuthorize("hasAnyRole('USER','EXTRAORDINARY')")
    @ResponseBody
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal){
        return userService.getCurrentUser(userPrincipal);
    }



}


