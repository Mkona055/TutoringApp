package com.mentorme.model.users;

import jakarta.persistence.*;

@Entity
public abstract class User {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column(name = "fName")
    private String firstName;

    @Column(name = "lName")
    private String lastName;

    @Column
    private String email;

    @Column(name = "password")
    private String passwordHash;

    public User() {}
}
