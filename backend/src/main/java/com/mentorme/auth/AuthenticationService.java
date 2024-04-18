package com.mentorme.auth;

import com.mentorme.model.users.User;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mentorme.config.JwtService;
import com.mentorme.dao.UserRepository;
import com.mentorme.model.users.Admin;
import com.mentorme.model.users.Student;
import com.mentorme.model.users.Tutor;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    
    
    public AuthenticationResponse register(RegisterRequest request) {
        String role = request.getRole();

        User user = null;
        switch (role) {
            case "ADMIN":
                user = new Admin();
                break;
            case "STUDENT":
                user = new Student();
                break;
            case "TUTOR":
                user = new Tutor();
                break;
        }
        
        user.setLocation(request.getLocation());
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole(request.getRole());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        var u = repository.save(user);
        Map<String, Object> m = new HashMap<>();
        m.put("userId", u.getId());
        m.put("role", u.getRole());
        m.put("location", u.getLocation());
        var jwtToken = jwtService.generateToken(m, user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var u = repository.findByEmail(request.getEmail()).orElseThrow();
        Map<String, Object> m = new HashMap<>();
        m.put("userId", u.getId());
        m.put("role", u.getRole());
        m.put("location", u.getLocation());
        var jwtToken = jwtService.generateToken(m, u);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

}