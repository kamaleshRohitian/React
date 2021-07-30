package com.spring.project.controller;

import com.spring.project.entity.User;
import com.spring.project.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/signup")
    public String doSignUp(@Valid @RequestBody User user)
    {
      return loginService.doSignUp(user);
    }

    /*@PostMapping("/loginpage")
    public String doLogin(@Valid @RequestBody User user)
    {
        return loginService.doLogin(user);
    }*/

    @GetMapping(value = "/")
    public String login()
    {
        return "verified";
    }

}
