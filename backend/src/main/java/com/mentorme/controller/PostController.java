package com.mentorme.controller;

import com.mentorme.dao.OfferRepository;
import com.mentorme.dao.PostRepository;
import com.mentorme.dao.RequestRepository;
import com.mentorme.model.posts.Offer;
import com.mentorme.model.posts.Post;
import com.mentorme.model.posts.Request;
import com.mentorme.model.users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/feed")
@CrossOrigin
public class PostController {

    private final RequestRepository requests;
    private final OfferRepository offers;
    private final PostRepository posts;

    @Autowired
    public PostController(RequestRepository requests, OfferRepository offers, PostRepository posts) {
        this.requests = requests;
        this.offers = offers;
        this.posts = posts;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Post>> getAllPosts() {
        return new ResponseEntity<>(posts.findAll(), HttpStatus.OK);
    }

    @GetMapping("/post/{id}")
    public ResponseEntity<Post> getPost(@PathVariable int id) {
        Post post = posts.findById(id).orElse(null);
//        if (post==null) offers.findById(id);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @GetMapping("/requests")
    public ResponseEntity<List<Request>> getAllRequests() {
        return new ResponseEntity<>(requests.findAll(), HttpStatus.OK);
    }

    @GetMapping("/offers")
    public ResponseEntity<List<Offer>> getAllOffers() {
        return new ResponseEntity<>(offers.findAll(), HttpStatus.OK);
    }

    @GetMapping("/offers/{tag}")
    public ResponseEntity<List<Offer>> getOffersByTag(@PathVariable String tag) {
        return new ResponseEntity<>(offers.findOffersByTags_Name(tag), HttpStatus.OK);
    }

    @GetMapping("/bytag")
    public ResponseEntity<List<Post>> getPostsByTags(@RequestParam List<String> tags) {
        return new ResponseEntity<>(posts.findPostsByTags_NameIn(tags), HttpStatus.OK);
//        http://localhost:8080/posts/tags?tags=JavaScript&tags=Python
    }

    @GetMapping("/offers/bytag")
    public ResponseEntity<List<Post>> getOffersByTags(@RequestParam List<String> tags) {
        return new ResponseEntity<>(offers.findOffersByTags_NameIn(tags), HttpStatus.OK);
    }

    @GetMapping("/requests/bytag")
    public ResponseEntity<List<Post>> getRequestsByTags(@RequestParam List<String> tags) {
        return new ResponseEntity<>(requests.findRequestsByTags_NameIn(tags), HttpStatus.OK);
    }

    @GetMapping("/requests/{tag}")
    public ResponseEntity<List<Request>> getRequestsByTag(@PathVariable String tag) {
        return new ResponseEntity<>(requests.findRequestsByTags_Name(tag), HttpStatus.OK);
    }

    @PostMapping("/createpost")
    public HttpStatus sendPost(Post p) {
        posts.save(p);
        return HttpStatus.CREATED;
    }

    @DeleteMapping("/{id}/delete")
    public HttpStatus deletePostById(@PathVariable int id) {
        posts.delete(posts.findPostById(id));
        return HttpStatus.OK;
    }

}
