// package com.stream.app.spring_stream_backend.Controller;
// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;

// import com.stream.app.spring_stream_backend.Entities.User;
// import com.stream.app.spring_stream_backend.Services.UserService;
// import jakarta.validation.Valid;


// import lombok.Value;

// @RestController
// @RequestMapping("/api/users")
// public class UserController {


//     @Autowired
//   private UserService userService;

// @PostMapping("/")
// public ResponseEntity<User> createUser(@Valid @RequestBody User user){
//     User creaUser=this.userService.createUser(user);
//     return new ResponseEntity<>(creaUser,HttpStatus.CREATED);

//   }
// }
