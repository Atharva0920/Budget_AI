package com.aganmote.budget_backend.dto;

public class AuthResponse {
    public String token;
    public String tokenType = "Bearer";

    public AuthResponse(String token) { this.token = token; }
}