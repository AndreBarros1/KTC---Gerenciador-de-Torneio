package com.myapp.models;

import javax.persistence.*;

@Entity
@Table(name = "teams")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long team_id;
    private String team_name;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    // Getters and Setters
    // ...
}
