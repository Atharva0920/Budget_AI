package com.aganmote.budget_backend.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.aganmote.budget_backend.dto.RegisterRequest;
import com.aganmote.budget_backend.model.User;
import com.aganmote.budget_backend.repository.UserRepository;
import com.aganmote.budget_backend.security.JwtUtil;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    public User register(RegisterRequest req) {
        if (userRepository.existsByUsername(req.username))
            throw new IllegalArgumentException("username taken");
        if (userRepository.existsByEmail(req.email))
            throw new IllegalArgumentException("email taken");

        User u = new User(req.username, req.email, passwordEncoder.encode(req.password));
        return userRepository.save(u);
    }

    public String login(String username, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        return jwtUtil.generateToken(username);
    }
}