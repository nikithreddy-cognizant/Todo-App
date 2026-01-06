package com.example.auth.controller;


import jakarta.servlet.http.HttpServletResponse; 

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.auth.config.JwtUtil;
import com.example.auth.model.User;
import com.example.auth.service.AuthService;

import jakarta.servlet.http.Cookie;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class AuthController {
	
	private final AuthService authservice;
	private final JwtUtil jwtUtil;

	public AuthController(AuthService authservice, JwtUtil jwtUtil) {
		this.authservice = authservice;
		this.jwtUtil = jwtUtil;
	}
	
	//Register
	@PostMapping("/register")
	public ResponseEntity<ApiResponse> register(@RequestBody User user) {
	    ApiResponse response = authservice.register(user);
	    return ResponseEntity.ok(response);
	}


	//login
	@PostMapping("/login")
	public ResponseEntity<ApiResponse> login(@RequestBody User loginData, HttpServletResponse httpResponse) {
	    ApiResponse response = authservice.login(loginData.getEmail(), loginData.getPassword());

	    if (response.isSuccess()) {
	        User user = response.getData();
	        System.out.println(user+"at login controller");
	        String token = jwtUtil.generateToken(user);

	        Cookie cookie = new Cookie("jwt", token);
	        cookie.setHttpOnly(true);
	        cookie.setSecure(false); 
	        cookie.setPath("/");
	        cookie.setMaxAge(60 * 60);
	        
	        System.out.println(cookie+"at login controller");

	        httpResponse.addCookie(cookie); 
	    }

	    return ResponseEntity.ok(response);
	}

	

@PostMapping("/logout")
public ResponseEntity<ApiResponse> logout(HttpServletResponse response) {
    Cookie delete = new Cookie("jwt", "");
    delete.setHttpOnly(true);
    delete.setSecure(false); 
    delete.setPath("/");     
    delete.setMaxAge(0);     

    response.addCookie(delete);
    return ResponseEntity.ok( new ApiResponse(true,"Logout successful", null));
}

	

}
