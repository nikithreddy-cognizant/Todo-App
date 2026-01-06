package com.example.auth.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.example.auth.model.User;

@Component
public class JwtUtil {

	@Value("${jwt.key}")
	private String SECRET_KEY;

	private final long EXPIRATION_TIME = 1000 * 60 * 60;

	private Key key;

	@PostConstruct
	public void init() {
		if (SECRET_KEY == null || SECRET_KEY.length() < 32) {
			throw new IllegalStateException("jwt.key must be at least 32 characters for HS256");
		}
		key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
	}

	public String generateToken(User user) {
		return Jwts.builder().setSubject(user.getEmail()).claim("id", user.getuserId())
				.claim("name", user.getUserName()).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
				.signWith(key, SignatureAlgorithm.HS256).compact();
	}

	public String extractEmail(String token) {
		return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
	}
}
