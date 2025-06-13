package com.stream.app.spring_stream_backend.Services.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stream.app.spring_stream_backend.Entities.User;
import com.stream.app.spring_stream_backend.Exception.ResourceNotFoundException;
import com.stream.app.spring_stream_backend.Repositories.UserRepository;
import com.stream.app.spring_stream_backend.Services.UserService;
@Service
public class UserServiceimpl implements UserService {

   @Autowired
    public UserRepository userRepo;

    @Override
    public User createUser(User user) {
        User savedUser=this.userRepo.save(user);
        return savedUser;
    }
     @Override
    public User getUserById(Integer userId){
      User user=this.userRepo.findById(userId).orElseThrow(()-> new ResourceNotFoundException("USer", "Id",userId));
      return user;
     
        
    }
      @Override
    public User getUserByEmail(String email){
      User user=this.userRepo.findByEmailIgnoreCase(email).orElseThrow(()-> new ResourceNotFoundException("USer", "Email",email));
      return user;
     
        
    }

}
