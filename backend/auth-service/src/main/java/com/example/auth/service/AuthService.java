package com.example.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.auth.controller.ApiResponse;
import com.example.auth.model.User;
import com.example.auth.repository.UserRepository;


@Service
public class AuthService {
	
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	
	public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}
	
	//register
	public ApiResponse register(User user) { 
		if (userRepository.existsByEmail(user.getEmail())) { 
			return new ApiResponse(false, "Email already registered!", null); 
			}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		User savedUser = userRepository.save(user); 
		return new ApiResponse( true, "User registered successfully", savedUser ); 
		}

	
	//login
	public ApiResponse login(String email,String password) {
	User user = userRepository.findByEmail(email);
	if(user == null) {
		return new ApiResponse(false, "User not found" , null); 
	}
	else if(!passwordEncoder.matches(password, user.getPassword())) {
		return new ApiResponse(false,"Incorrect password",null);
	}

	ApiResponse response = new ApiResponse(true, "User Login Success", user);
	
		return response;
	}
}
