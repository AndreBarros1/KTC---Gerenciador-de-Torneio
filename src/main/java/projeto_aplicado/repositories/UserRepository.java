package com.myapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.myapp.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
