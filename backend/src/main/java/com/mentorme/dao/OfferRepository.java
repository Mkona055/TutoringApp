package com.mentorme.dao;

import com.mentorme.model.Tag;
import com.mentorme.model.posts.Offer;
import com.mentorme.model.posts.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Integer> {

    List<Offer> findOffersByTags_Name(String Name);
}
