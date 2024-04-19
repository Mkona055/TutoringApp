package com.mentorme.model.users;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("ADMIN")
public class Admin extends User {
    public Admin() {
        super();
        role = "ADMIN";
    }

    public Admin(Admin admin) {
        super(admin);
    }

    //    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id", nullable = false)
//    private Integer id;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id")
//    private User user;
//
//    public int getId() {
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
        if (!(object instanceof Admin)) return false;
        return super.equals(object);
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }
}