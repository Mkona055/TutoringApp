package com.mentorme.model.users;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("STUDENT")
public class Student extends User {
    public Student() {
        super();
        role = "STUDENT";
    }
//    public Student() {
//        this.role = "STUDENT";
//    }

    //    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id", nullable = false)
//    private Integer id;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_Id")
//    private User user;
//
//    public Integer getId() {
//        return id;
//    }
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

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Student)) return false;
        return super.equals(object);
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }
}