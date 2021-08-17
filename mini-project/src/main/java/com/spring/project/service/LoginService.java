package com.spring.project.service;

import com.spring.project.entity.User;
import com.spring.project.entity.UserLogin;
import com.spring.project.exception.UserNameException;
import com.spring.project.repository.LoginRepository;
import com.spring.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

import javax.persistence.EntityManager;
import java.sql.Date;
import java.util.Calendar;
import java.util.List;

@Service
public class LoginService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public  User login(User user)
    {
       // UserLogin userLogin=new UserLogin();
        try {

            List<UserLogin> userLoginList1=loginRepository.findByLogindate(new Date(Calendar.getInstance().getTime().getTime()));
            //System.out.println("check:"+userLoginList1);
            List<UserLogin> userLoginList2=loginRepository.findAll();
            //System.out.println("check2:"+userLoginList2);
            List<UserLogin> userLoginList3= loginRepository.findByUsername(user.getUsername());
            //System.out.println("check3: "+userLoginList3);
            if((userLoginList1.isEmpty() && userLoginList2.size()>0 )|| userLoginList3.size()>1)
            {
                entityManager.createNativeQuery("delete from login where logindate!=? ")
                        .setParameter(1,new Date(Calendar.getInstance().getTime().getTime()))
                        .executeUpdate();
            }
            String check=loginCheck(user.getUsername());
             if(check.equals("ok")) {
                 List<User> userList=userRepository.findByUsername(user.getUsername());
                 return userList.get(0);
             }
        }catch (Exception e)
        {
            throw new UserNameException(user.getUsername()+" error occurred");
            //System.out.println(e.getMessage().toString());
        }
        return null;
    }

    @Transactional
    public String loginCheck(String username){
        List<UserLogin> userLoginList = loginRepository.findByUsername(username);
        if(userLoginList.isEmpty())
        {
            entityManager.createNativeQuery("insert into login(username,logindate,count) values(?,?,?)")
                    .setParameter(1,username)
                    .setParameter(2,new Date(Calendar.getInstance().getTime().getTime()))
                    .setParameter(3,1)
                    .executeUpdate();
        }
        else if(userLoginList.size()>0)
        {
            System.out.println("entered");
            int count =loginRepository.findByCount(username);
            System.out.println("inside:c "+count);
                entityManager.createNativeQuery("update login set count = ? where username= ? ;")
                        .setParameter(1,count+1)
                        .setParameter(2,username)
                        .executeUpdate();
            //System.out.println("count:"+count);

        }
        return "ok";
    }

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

    @Transactional
    public List<UserLogin> userLogin(String username)
    {
        List<User> userList =userRepository.findByUsername(username);
        List<UserLogin> list;
        if(userList.get(0).getAuthority().equals("admin"))
        {
            list=loginRepository.findAll();

        }
        else{
            list=loginRepository.findByUsername(username);
        }

        return list;
    }

}
