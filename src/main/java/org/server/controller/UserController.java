package org.server.controller;


import org.server.entity.User;
import org.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Collection;

@RequestMapping(path= "/users")
@Controller
public class UserController extends BaseController {


    @Autowired
    UserService userService;

    @PostMapping(path = "/login")
    @ResponseBody
    public String login(HttpSession session, @Valid@RequestBody LoginUser user){
        checkNotLoggedIn(session);
        User u = userService.matchPassword(user.email, user.password);
        session.setAttribute("simpleapp_auth_id", u.getId());
        return u.getId();
    }



    @GetMapping(path = "/prova")
    @ResponseBody
    public Collection<User> getUsers(){
        return userService.getUsers();
    }

    static class LoginUser {
        @NotNull
        public String email;
        @NotNull
        public String password;
    }


}


