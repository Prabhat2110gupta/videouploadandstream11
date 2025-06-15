package com.stream.app.spring_stream_backend.Services.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.stream.app.spring_stream_backend.Entities.User;
import com.stream.app.spring_stream_backend.Exception.ResourceNotFoundException;
import com.stream.app.spring_stream_backend.Repositories.UserRepository;
import com.stream.app.spring_stream_backend.Services.UserService;

@Service
public class UserServiceimpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder; // ✅ Inject PasswordEncoder

    @Override
    public User createUser(User user) {
        // ✅ Encode the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public User getUserById(Integer userId) {
        return userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "Id", userId));
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepo.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "Email", email));
    }
}
