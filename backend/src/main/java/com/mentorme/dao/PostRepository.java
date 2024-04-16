package com.mentorme.dao;

import com.mentorme.model.posts.Offer;
import com.mentorme.model.posts.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    Post findPostById(int id);

    List<Post> findPostsByTags_NameIn(List<String> Name);

    List<Post> findPostsByHourlyRateIsLessThanEqual(double rate);

    List<Post> findPostByUser_Location(String location);


//    List<Post> findPostByFilter(List<String> tags, double rate, String location);
//    List<Post> findPostsByTags_NameInAndHourlyRateIsLessThanEqualAndLocation(List<String> tags, double rate, String location);

//    List<Post> findPostsByTagsAndHourlyRateAndLocation(List<String> tagList, double maxHourlyRate, String location);
}
