package com.mentorme.model.users;

import com.mentorme.model.Role;
import jakarta.persistence.*;

@Entity
public abstract class User {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column(name = "f_name")
    private String firstName;


    @Column(name = "lName")
    private String lastName;

    @Column
    private String email;

    @Column(name = "password")
    private String passwordHash;

    @Column(name = "role")
    private Role role;

    public User() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
