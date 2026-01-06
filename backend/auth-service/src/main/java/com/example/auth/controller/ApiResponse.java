package com.example.auth.controller;

import com.example.auth.model.User;

public class ApiResponse {
    private boolean success;
    private String message;
    private User data;

    public ApiResponse(boolean success, String message, User user) {
        this.success = success;
        this.message = message;
        this.data = user;
    }

    // getters and setters
    public boolean isSuccess() { 
    	return success; 
    	}
    
    public void setSuccess(boolean success) { 
    	this.success = success; 
    	}

    public String getMessage() { 
    	return message; 
    	}
    
    public void setMessage(String message) { 
    	this.message = message; 
    	}

    public User getData() { 
    	return data; 
    	}
    
    public void setData(User data) {
    	this.data = data; 
    	}
    
    
}

