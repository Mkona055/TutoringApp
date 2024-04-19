package com.mentorme.model.users;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("TUTOR")
public class Tutor extends User {
    public Tutor() {
        super();
        role = "TUTOR";
    }

    public Tutor(Tutor tutor) {
        super(tutor);
    }
//    public Tutor() {
//        super();
//        this.role = "TUTOR";
//    }
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


    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Tutor)) return false;
        return super.equals(object);
    }
}