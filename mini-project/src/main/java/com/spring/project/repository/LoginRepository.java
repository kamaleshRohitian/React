package com.spring.project.repository;


import com.spring.project.entity.UserLogin;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface LoginRepository extends CrudRepository<UserLogin,Long> {
    List<UserLogin> findByUsername(String name);
    List<UserLogin> findAll();
    @Query(
            value = "SELECT count FROM login u WHERE u.username=?1",
            nativeQuery = true)
    int findByCount(String name);
    List<UserLogin> findByLogindate(Date date);
}
