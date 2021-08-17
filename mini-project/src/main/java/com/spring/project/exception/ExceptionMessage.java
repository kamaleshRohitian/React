package com.spring.project.exception;

import java.util.Date;

public class ExceptionMessage {
    private Date date;
    private String message;
    private String details;
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getDetails() {
		return details;
	}
	public void setDetails(String details) {
		this.details = details;
	}
	public ExceptionMessage(Date date, String message, String details) {
		super();
		this.date = date;
		this.message = message;
		this.details = details;
	}
	public ExceptionMessage() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "ExceptionMessage [date=" + date + ", message=" + message + ", details=" + details + "]";
	}
    
    

}
