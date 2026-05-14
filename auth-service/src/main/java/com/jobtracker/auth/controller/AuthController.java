package com.jobtracker.auth.controller;

import com.jobtracker.auth.dto.RegisterRequest;
import com.jobtracker.auth.entity.User;
import com.jobtracker.auth.repository.UserRepository;
import com.jobtracker.auth.security.JwtUtil;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;

    private BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder();

    public AuthController(
            UserRepository userRepository,
            JwtUtil jwtUtil
    ) {

        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request
    ) {

        Optional<User> existingUser =
                userRepository.findByEmail(
                        request.getEmail()
                );

        if (existingUser.isPresent()) {

            return ResponseEntity
                    .badRequest()
                    .body("Email already exists");
        }

        User user = new User();

        user.setName(request.getName());

        user.setEmail(request.getEmail());

        user.setPassword(
                encoder.encode(
                        request.getPassword()
                )
        );

        userRepository.save(user);

        return ResponseEntity.ok(
                "User registered successfully"
        );
    }

    // LOGIN
    @PostMapping("/login")
    public Map<String, String> login(
            @RequestBody User request
    ) {

        Optional<User> existingUser =
                userRepository.findByEmail(
                        request.getEmail()
                );

        if (
                existingUser.isEmpty() ||
                !encoder.matches(
                        request.getPassword(),
                        existingUser.get().getPassword()
                )
        ) {

            throw new RuntimeException(
                    "Invalid credentials"
            );
        }

        String token =
                jwtUtil.generateToken(
                        existingUser.get().getEmail()
                );

        return Map.of(
                "access_token",
                token
        );
    }

    // CURRENT USER
    @GetMapping("/me")
    public String getProfile(
            @RequestHeader("Authorization")
            String authHeader
    ) {

        String token =
                authHeader.substring(7);

        if (jwtUtil.validateToken(token)) {

            String email =
                    jwtUtil.extractEmail(token);

            return "Logged in as: " + email;
        }

        throw new RuntimeException(
                "Invalid token"
        );
    }
}