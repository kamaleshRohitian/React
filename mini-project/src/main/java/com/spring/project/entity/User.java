package com.spring.project.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Entity
@Table(name = "users")
@Data
public class User {

    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Id
    @NotNull
    @Size(min = 5, message = "Username Should have at least 5 characters!...")
    private String username;
    @NotNull
    @Size(min = 5, message = "Password should be minimum 5 characters!")
    private String password;
    private String authority;
}
