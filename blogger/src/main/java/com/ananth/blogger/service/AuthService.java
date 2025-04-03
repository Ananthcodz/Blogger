package com.ananth.blogger.service;

import com.ananth.blogger.dto.AuthResponse;
import com.ananth.blogger.dto.LoginRequest;
import com.ananth.blogger.dto.RegisterRequest;
import com.ananth.blogger.model.User;

public interface AuthService {
    AuthResponse login(LoginRequest loginRequest);
    User register(RegisterRequest registerRequest);
    User getCurrentUser();
}