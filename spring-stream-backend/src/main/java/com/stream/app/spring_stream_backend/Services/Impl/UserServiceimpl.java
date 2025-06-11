package com.stream.app.spring_stream_backend.Services.Impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.stream.app.spring_stream_backend.Entities.User;
import com.stream.app.spring_stream_backend.Repositories.UserRepository;
import com.stream.app.spring_stream_backend.Services.UserService;

public class UserServiceimpl implements UserService {

   @Autowired
    public UserRepository userRepo;

    @Override
    public User createUser(User user) {
        User savedUser=this.userRepo.save(user);
        return savedUser;
    }

}
