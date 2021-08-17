package com.spring.project.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;

@RestController
@ControllerAdvice
public class ExceptionController extends ResponseEntityExceptionHandler {
    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handle(Exception ex, WebRequest request)  {
        ExceptionMessage notFoundException=
                new ExceptionMessage(new Date(),ex.getMessage(),request.getDescription(false));
        return new ResponseEntity(notFoundException,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(UserNameException.class)
    public final ResponseEntity<Object> UserNotFoundException(UserNameException ex, WebRequest request)  {
        ExceptionMessage notFoundException=
                new ExceptionMessage(new Date(),ex.getMessage(),request.getDescription(false));
        return new ResponseEntity(notFoundException, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {

        ExceptionMessage notFoundException=
                new ExceptionMessage(new Date(),ex.getBindingResult().getFieldError().getDefaultMessage(),"Validation error");
        return new ResponseEntity(notFoundException,HttpStatus.BAD_REQUEST);
    }
}
