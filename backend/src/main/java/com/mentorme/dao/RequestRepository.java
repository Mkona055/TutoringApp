package com.mentorme.dao;

import com.mentorme.model.posts.Post;
import com.mentorme.model.posts.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request, Integer> {

    List<Request> findRequestsByTags_Name(String tagName);

    List<Post> findRequestsByTags_NameIn(List<String> tags);
}
