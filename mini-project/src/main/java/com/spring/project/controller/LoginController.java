package com.spring.project.controller;

import com.spring.project.entity.User;
import com.spring.project.entity.UserLogin;
import com.spring.project.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


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

    @PostMapping(value = "/")
    public User login(@RequestBody User user)
    {
        //System.out.println("user:"+user);
        return loginService.login(user);
    }

    @GetMapping(value = "/logindetails/{username}")
    public List<UserLogin> userLogin
            (@PathVariable String username)
    {
        return loginService.userLogin(username);
    }

}
