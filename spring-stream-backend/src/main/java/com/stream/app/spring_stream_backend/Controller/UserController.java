package com.stream.app.spring_stream_backend.Controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.stream.app.spring_stream_backend.Entities.User;
import com.stream.app.spring_stream_backend.Services.UserService;

import jakarta.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/users")
public class UserController {


    @Autowired
  private UserService userService;

@PostMapping
public ResponseEntity<User> createUser(@Valid @RequestBody User user){
    User creaUser=this.userService.createUser(user);
    return new ResponseEntity<>(creaUser,HttpStatus.CREATED);

  }
@GetMapping("/userId/{userId}")
public ResponseEntity<User> getUserById(@PathVariable Integer userId){
  return ResponseEntity.ok(this.userService.getUserById(userId));
}

@GetMapping("/email/{email}")
public ResponseEntity<User> getUserByEmail(@PathVariable String email){
  return ResponseEntity.ok(this.userService.getUserByEmail(email));
}
}

