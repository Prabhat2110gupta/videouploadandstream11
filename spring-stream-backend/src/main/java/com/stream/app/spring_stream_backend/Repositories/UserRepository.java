package com.stream.app.spring_stream_backend.Repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import com.stream.app.spring_stream_backend.Entities.User;

public interface UserRepository extends JpaRepository<User,Integer> {

}
