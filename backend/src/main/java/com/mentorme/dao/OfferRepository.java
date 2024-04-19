package com.mentorme.dao;

import com.mentorme.model.posts.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Integer> {

    List<Offer> findOffersByTags_Name(String Name);

    List<Offer> findOffersByTags_NameIn(List<String> tags);

    List<Offer> findOffersByHourlyRateIsLessThanEqual(Double maxHourlyRate);

    List<Offer> findOffersByUser_Location(String location);
}
