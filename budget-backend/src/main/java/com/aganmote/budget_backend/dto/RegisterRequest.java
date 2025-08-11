package com.aganmote.budget_backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {
    @NotBlank @Size(min=3)
    public String username;

    @NotBlank @Email
    public String email;

    @NotBlank @Size(min=6)
    public String password;
}