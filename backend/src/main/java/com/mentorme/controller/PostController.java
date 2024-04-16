package com.mentorme.controller;

import com.google.gson.Gson;
import com.mentorme.dao.OfferRepository;
import com.mentorme.dao.PostRepository;
import com.mentorme.dao.RequestRepository;
import com.mentorme.dao.TagRepository;
import com.mentorme.model.posts.Offer;
import com.mentorme.model.posts.Post;
import com.mentorme.model.posts.Request;
import com.mentorme.model.users.User;
import jakarta.persistence.JoinColumn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/feed")
@CrossOrigin
public class PostController {

    private final RequestRepository requests;
    private final OfferRepository offers;
    private final PostRepository posts;
    private final TagRepository tags;

    @Autowired
    public PostController(RequestRepository requests, OfferRepository offers, PostRepository posts, TagRepository tags) {
        this.requests = requests;
        this.offers = offers;
        this.posts = posts;
        this.tags = tags;
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
    }

    @GetMapping("/offers/bytag")
    public ResponseEntity<List<Post>> getOffersByTags(@RequestParam List<String> tags) {
        return new ResponseEntity<>(offers.findOffersByTags_NameIn(tags), HttpStatus.OK);
    }

    @GetMapping("/requests/bytag")
    public ResponseEntity<List<Post>> getRequestsByTags(@RequestParam List<String> tags) {
        return new ResponseEntity<>(requests.findRequestsByTags_NameIn(tags), HttpStatus.OK);
    }

    @GetMapping("/filtered")
    public ResponseEntity<List<Post>> getPostsFiltered(
            @RequestParam(required = false) List<String> tags,
            @RequestParam(required = false) Double maxHourlyRate,
            @RequestParam(required = false) String location
    ) {
        Set<Post> results = new HashSet<>(posts.findAll());
        // .retainAll() acts as intersection of two sets
        if (tags!=null)             results.retainAll(posts.findPostsByTags_NameIn(tags));
        if (maxHourlyRate!=null)    results.retainAll(posts.findPostsByHourlyRateIsLessThanEqual(maxHourlyRate));
        if (location!=null)         results.retainAll(posts.findPostByUser_Location(location));

        return new ResponseEntity<>(new ArrayList<>(results), HttpStatus.OK);
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

    @GetMapping("user/{id}/posts")
    public ResponseEntity<List<Post>> getPostsByUserId(@PathVariable int id) {
        return new ResponseEntity<>(posts.findPostsByUserId(id), HttpStatus.OK);
    }

    @PutMapping("/post/{id}/update")
    public ResponseEntity<Post> updatePostById(@PathVariable int id, @RequestParam Post post) {

        if (id != post.getId()) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        posts.deleteById(id);
        posts.save(post);
        return new ResponseEntity<>(posts.findPostById(id), HttpStatus.OK);
    }

    @DeleteMapping("/post/{id}/delete")
    public ResponseEntity<Post> deletePost(@PathVariable int id) {

        Optional<Post> p = posts.findById(id);

        if (p.isPresent()) {
            posts.delete(p.get());
            return new ResponseEntity<>(p.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/newpost")
    public ResponseEntity<Post> createPost(@RequestBody Map<String,String> body) {
        String type = body.get("role");

        Post post;
        if (type.equals("OFFER")) {
            post = new Offer();
        } else if (type.equals("REQUEST")) {
            post = new Request();
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        post.setDescription(
                body.get("description"));
        post.setId(
                Integer.parseInt(body.get("id")));
        post.setInPerson(
                Boolean.getBoolean(body.get("inPerson")));

        RestTemplate rt = new RestTemplate();
        ResponseEntity<User> user = rt.getForEntity("http://localhost:8080/users/user/{id}", User.class, body.get("user_id"));
        post.setUser( user.getBody() );

        int[] tagIds =  new Gson().fromJson(body.get("tags"), int[].class);
        for (int tagId : tagIds) {
            post.addTag(tags.findTagById(tagId));
        }

        posts.save(post);

        return new ResponseEntity<>(posts.findPostById(post.getId()), HttpStatus.OK);
    }

}
