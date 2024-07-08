package com.myapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.myapp.models.Team;

public interface TeamRepository extends JpaRepository<Team, Long> {
}
