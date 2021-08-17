package com.spring.project.entity;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "login")
@Data
public class UserLogin {


    //@GeneratedValue(strategy = GenerationType.AUTO)
    //private int id;
    @Id
    private String username;
    private Date logindate;
    private int count;
}
