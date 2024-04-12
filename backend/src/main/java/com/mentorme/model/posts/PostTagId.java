//package com.mentorme.model.posts;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Embeddable;
//import org.hibernate.Hibernate;
//
//import java.io.Serializable;
//import java.util.Objects;
//
//@Embeddable
//public class PostTagId implements Serializable {
//    private static final long serialVersionUID = -7901068967336978347L;
//    @Column(name = "id", nullable = false)
//    private Integer id;
//
//    @Column(name = "post_id", nullable = false)
//    private Integer postId;
//
//    @Column(name = "is_offer", nullable = false)
//    private Boolean isOffer = false;
//
//    public Integer getId() {
//        return id;
//    }
//
//    public void setId(Integer id) {
//        this.id = id;
//    }
//
//    public Integer getPostId() {
//        return postId;
//    }
//
//    public void setPostId(Integer postId) {
//        this.postId = postId;
//    }
//
//    public Boolean getIsOffer() {
//        return isOffer;
//    }
//
//    public void setIsOffer(Boolean isOffer) {
//        this.isOffer = isOffer;
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
//        PostTagId entity = (PostTagId) o;
//        return Objects.equals(this.isOffer, entity.isOffer) &&
//                Objects.equals(this.id, entity.id) &&
//                Objects.equals(this.postId, entity.postId);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(isOffer, id, postId);
//    }
//
//}