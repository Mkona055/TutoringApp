package com.mentorme.model.posts;

import com.mentorme.model.users.User;
import jakarta.persistence.*;

@Entity
public abstract class Post {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column
    private boolean inPerson;

    @Column
    private String description;

    @Column
    private Double hourlyRate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
