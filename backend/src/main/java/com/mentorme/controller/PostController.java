package com.mentorme.controller;

import com.mentorme.dao.OfferRepository;
import com.mentorme.dao.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class PostController {

    private final RequestRepository requests;
    private final OfferRepository offers;

    @Autowired
    public PostController(RequestRepository requests, OfferRepository offers) {
        this.requests = requests;
        this.offers = offers;
    }
}
