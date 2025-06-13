package com.stream.app.spring_stream_backend.Services;


import com.stream.app.spring_stream_backend.Entities.User;

public interface UserService {
 User createUser(User user);
 User getUserById(Integer userId);
 User getUserByEmail(String Email);
}
