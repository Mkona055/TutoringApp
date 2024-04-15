package com.mentorme.model.users;

import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE) // or InheritanceType.TABLE_PER_CLASS, InheritanceType.JOINED
@DiscriminatorColumn(name = "ROLE", discriminatorType = DiscriminatorType.STRING)
public abstract class User {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    protected int id;

    @Column(name = "location")
    protected String location;

    @Column(name = "f_name")
    protected String firstName;

    @Column(name = "l_name")
    protected String lastName;

    @Column(name = "email")
    protected String email;

    @Column(name = "password")
    protected String passwordHash;

    @Column(name = "role", insertable = false, updatable = false)
    protected String role;

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

   public String getRole() {
       return role;
   }

   public String getLocation() {
    return location;
}

public void setLocation(String location) {
    this.location = location;
}

//    public void setRole(String role) {
//        this.role = role;
//    }
}
