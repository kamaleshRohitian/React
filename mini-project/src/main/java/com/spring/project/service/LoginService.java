package com.spring.project.service;

import com.spring.project.entity.User;
import com.spring.project.exception.UserNameException;
import com.spring.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Service
public class LoginService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public String doSignUp(User user) throws UserNameException
    {
        try {
            entityManager.createNativeQuery("insert into users(username,password,authority) values(?,?,?)")
                    .setParameter(1,user.getUsername())
                    .setParameter(2,user.getPassword())
                    .setParameter(3,user.getAuthority())
                    .executeUpdate();
            //userRepository.save(user);
            return "success";
        }catch (Exception e)
        {
          throw new UserNameException(user.getUsername()+" already present in the db!...");
        }
    }

   /* @Transactional
    public String doLogin(User user) throws UserNameException
    {
        System.out.println("pass1:"+user.getPassword());
        List<User> userList = userRepository.findByUsername(user.getUsername());
        if(userList.size()>0)
        {
            System.out.println("pass2:"+userList.get(0).getPassword());
            if(user.getPassword().equals(userList.get(0).getPassword())) {
                return user.getUsername();
            }
            else
            {
                throw new UserNameException(user.getUsername()+" Please check you password");
            }
        }
        else
        {
           throw new UserNameException(user.getUsername()+" is not stored in db!.");
        }
    }*/
}
