package com.mentorme.model.posts;

import com.mentorme.model.Tag;
import com.mentorme.model.users.User;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE) // or InheritanceType.TABLE_PER_CLASS, InheritanceType.JOINED
@DiscriminatorColumn(name = "TYPE", discriminatorType = DiscriminatorType.STRING)
public abstract class Post {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    protected int id;

    @Column
    protected boolean inPerson;

    @Column(name = "post_desc")
    protected String description;

    @Column
    protected Double hourlyRate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    protected User user;

    @ManyToMany
    @JoinTable(name = "post_tag",
            joinColumns = {@JoinColumn(name = "post_id")},
            inverseJoinColumns = {@JoinColumn(name = "tag_id")})
    protected Set<Tag> tags;

    public Post() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isInPerson() {
        return inPerson;
    }

    public void setInPerson(boolean inPerson) {
        this.inPerson = inPerson;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getHourlyRate() {
        return hourlyRate;
    }

    public void setHourlyRate(Double hourlyRate) {
        this.hourlyRate = hourlyRate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Tag> getTags() {
        return tags;
    }
}
