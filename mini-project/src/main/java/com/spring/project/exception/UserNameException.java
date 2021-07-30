package com.spring.project.exception;

public class UserNameException extends RuntimeException{
    public UserNameException(String message)
    {
        super(message);
    }
}
