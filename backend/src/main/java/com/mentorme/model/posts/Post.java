package com.mentorme.model.posts;

import com.mentorme.model.Tag;
import com.mentorme.model.users.User;
import jakarta.persistence.*;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE) // or InheritanceType.TABLE_PER_CLASS, InheritanceType.JOINED
@DiscriminatorColumn(name = "TYPE", discriminatorType = DiscriminatorType.STRING)
public abstract class Post {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    protected int id;

    @Column
    protected String title;

    @Column
    protected boolean inPerson;

    @Column(name = "post_desc")
    protected String description;

    @Column
    protected Double hourlyRate;

    @ManyToOne(fetch = FetchType.EAGER) // was getting lazy error
    @JoinColumn(name = "user_id", nullable = false)
    protected User user;

    @ManyToMany
    @JoinTable(name = "post_tag",
            joinColumns = {@JoinColumn(name = "post_id")},
            inverseJoinColumns = {@JoinColumn(name = "tag_id")})
    protected Set<Tag> tags = new HashSet<>();

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

    public void addTag(Tag t) {
        if (tags == null){
            tags = new HashSet<>();
        }
        tags.add(t);
    }

    public String getTitle() {
        return title;
    }

    public void setTags(Set<Tag> newTags) {
        tags = newTags;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        Post post = (Post) object;
        return id == post.id && inPerson == post.inPerson && Objects.equals(description, post.description) && Objects.equals(hourlyRate, post.hourlyRate) && Objects.equals(user, post.user) && Objects.equals(tags, post.tags);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, inPerson, description, hourlyRate, user, tags);
    }
}
