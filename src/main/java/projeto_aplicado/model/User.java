package com.myapp.models;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;
    private String name;
    private String email;
    private String nickname;
    private String profile_picture;

    // Getters and Setters
    // ...
}
