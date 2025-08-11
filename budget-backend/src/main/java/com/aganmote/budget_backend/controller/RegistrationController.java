package com.aganmote.budget_backend.controller;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.aganmote.budget_backend.model.User;
import com.aganmote.budget_backend.repository.UserRepository;

@RestController
@RequestMapping("/register")
public class RegistrationController {

    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder;

    public RegistrationController(UserRepository repo, BCryptPasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    @PostMapping
    public String registerUser(@RequestBody User user) {
        user.setPassword(encoder.encode(user.getPassword())); // hash password
        repo.save(user);
        return "User registered successfully";
    }
}
