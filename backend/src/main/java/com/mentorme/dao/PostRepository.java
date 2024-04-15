package com.mentorme.dao;

import com.mentorme.model.posts.Offer;
import com.mentorme.model.posts.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    Post findPostById(int id);

    List<Post> findPostsByTags_NameIn(List<String> Name);

}
