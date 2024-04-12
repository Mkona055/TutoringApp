package com.mentorme.model.posts;

import com.mentorme.model.Tag;
import jakarta.persistence.*;

@Entity
@Table(name = "post_tag")
public class PostTag {
    @EmbeddedId
    private PostTagId id;

    @MapsId("id")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id", nullable = false)
    private Tag id1;

    @MapsId("postId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    public PostTagId getId() {
        return id;
    }

    public void setId(PostTagId id) {
        this.id = id;
    }

    public Tag getId1() {
        return id1;
    }

    public void setId1(Tag id1) {
        this.id1 = id1;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

}