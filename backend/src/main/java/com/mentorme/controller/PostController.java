package com.mentorme.controller;

import com.mentorme.dao.OfferRepository;
import com.mentorme.dao.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class PostController {

    RequestRepository requests;
    OfferRepository offers;

    @Autowired
    public PostController(RequestRepository requests, OfferRepository offers) {
        this.requests = requests;
        this.offers = offers;
    }
}
