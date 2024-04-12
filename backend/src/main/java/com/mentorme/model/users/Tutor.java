package com.mentorme.model.users;

import com.mentorme.model.Role;
import jakarta.persistence.*;

@Entity
//@Table(name = "tutor")
@DiscriminatorValue(value = "TUTOR")
public class Tutor extends User {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id", nullable = false)
//    private Integer id;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id")
//    private User user;
//
//    @Column
//    private Role role = Role.TUTOR;
//
////    public Integer getId() {
////        return id;
////    }
//
//    public void setId(Integer id) {
//        this.id = id;
//    }
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }

}