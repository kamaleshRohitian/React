package com.spring.project.config;

import com.spring.project.entity.User;
import com.spring.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserAuthendicationProvider implements AuthenticationProvider {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();
        List<User> user= userRepository.findByUsername(username);
        if(user.size()>0)
        {
            if(passwordEncoder.matches(password, user.get(0).getPassword()))
            {
                List<GrantedAuthority> authority = new ArrayList<>();
                authority.add(new SimpleGrantedAuthority(user.get(0).getAuthority()));
                return new UsernamePasswordAuthenticationToken(username,password,authority);
            }
            else
            {
                throw new BadCredentialsException("Invalid password");
            }
        }
        else
        {
            throw new BadCredentialsException("No user registered with this username");
        }

    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

}
