package com.stream.app.spring_stream_backend.Services.Impl;

import java.util.ArrayList;

import com.stream.app.spring_stream_backend.Entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.stereotype.Service;

import com.stream.app.spring_stream_backend.Exception.ResourceNotFoundException;
import com.stream.app.spring_stream_backend.Repositories.UserRepository;

@Service
public class CustomerUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String email)  {
       User user=this.userRepo.findByEmailIgnoreCase(email).orElseThrow(()-> new ResourceNotFoundException("USer", "Email",email));

        return new org.springframework.security.core.userdetails.User(
            user.getEmail(), user.getPassword(), new ArrayList<>()
        );
    }
}

