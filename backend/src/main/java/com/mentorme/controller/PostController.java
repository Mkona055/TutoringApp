package com.mentorme.controller;

import com.google.gson.Gson;
import com.mentorme.dao.*;
import com.mentorme.model.Tag;
import com.mentorme.model.posts.Offer;
import com.mentorme.model.posts.Post;
import com.mentorme.model.posts.PostCreateDto;
import com.mentorme.model.posts.Request;
import com.mentorme.model.users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/feed")
@CrossOrigin
public class PostController {

    private final UserRepository users;
    private final RequestRepository requests;
    private final OfferRepository offers;
    private final PostRepository posts;
    private final TagRepository tags;

    @Autowired
    public PostController(RequestRepository requests,
                          OfferRepository offers,
                          PostRepository posts,
                          TagRepository tags,
                          UserRepository users) {
        this.requests = requests;
        this.offers = offers;
        this.posts = posts;
        this.tags = tags;
        this.users = users;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Post>> getAllPosts() {
        return new ResponseEntity<>(posts.findAll(), HttpStatus.OK);
    }

    @GetMapping("/tags")
    public ResponseEntity<List<Tag>> getAllTags() {
        return new ResponseEntity<>(tags.findAll(), HttpStatus.OK);
    }


    @GetMapping("/post/{id}")
    public ResponseEntity<Post> getPost(@PathVariable int id) {
        Post post = posts.findById(id).orElse(null);

        if (post==null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(post, HttpStatus.OK);
        }
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
    public ResponseEntity<List<Offer>> getOffersByTags(@RequestParam List<String> tags) {
        return new ResponseEntity<>(offers.findOffersByTags_NameIn(tags), HttpStatus.OK);
    }

    @GetMapping("/requests/bytag")
    public ResponseEntity<List<Request>> getRequestsByTags(@RequestParam List<String> tags) {
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
        if (location!=null)         results.retainAll(posts.findPostsByUser_Location(location));

        return new ResponseEntity<>(new ArrayList<>(results), HttpStatus.OK);
    }

    @GetMapping("/requests/filtered")
    public ResponseEntity<List<Request>> getRequestsFiltered(
            @RequestParam(required = false) List<String> tags,
            @RequestParam(required = false) Double maxHourlyRate,
            @RequestParam(required = false) String location
    ) {
        Set<Request> results = new HashSet<>(requests.findAll());
        // .retainAll() acts as intersection of two sets
        if (tags!=null)             results.retainAll(requests.findRequestsByTags_NameIn(tags));
        if (maxHourlyRate!=null)    results.retainAll(requests.findRequestsByHourlyRateIsLessThanEqual(maxHourlyRate));
        if (location!=null)         results.retainAll(requests.findRequestsByUser_Location(location));

        return new ResponseEntity<>(new ArrayList<>(results), HttpStatus.OK);
    }

    @GetMapping("/offers/filtered")
    public ResponseEntity<List<Offer>> getOffersFiltered(
            @RequestParam(required = false) List<String> tags,
            @RequestParam(required = false) Double maxHourlyRate,
            @RequestParam(required = false) String location
    ) {
        Set<Offer> results = new HashSet<>(offers.findAll());
        // .retainAll() acts as intersection of two sets
        if (tags!=null)             results.retainAll(offers.findOffersByTags_NameIn(tags));
        if (maxHourlyRate!=null)    results.retainAll(offers.findOffersByHourlyRateIsLessThanEqual(maxHourlyRate));
        if (location!=null)         results.retainAll(offers.findOffersByUser_Location(location));

        return new ResponseEntity<>(new ArrayList<>(results), HttpStatus.OK);
    }

    @GetMapping("/requests/{tag}")
    public ResponseEntity<List<Request>> getRequestsByTag(@PathVariable String tag) {
        return new ResponseEntity<>(requests.findRequestsByTags_Name(tag), HttpStatus.OK);
    }

    @PostMapping("/newtag")
    public ResponseEntity<Tag> createTag(@RequestBody Map<String,String> tagFields) {
        Tag tag = new Tag();
        tag.setName(tagFields.get("name"));
        tags.save(tag);
        return new ResponseEntity<>(tag, HttpStatus.CREATED);
    }


    @PostMapping("/savepost")
    public HttpStatus sendPost(Post p) {
        posts.save(p);
        return HttpStatus.CREATED;
    }

    @DeleteMapping("/{id}/delete")
    public HttpStatus deletePostById(@PathVariable int id) {
        posts.delete(posts.findPostById(id));
        return HttpStatus.OK;
    }

    @DeleteMapping("/tag/{id}/delete")
    public HttpStatus deleteTagById(@PathVariable int id) {
        Tag tag = tags.findTagById(id);
        if (tag == null) {
            return HttpStatus.NOT_FOUND;
        }
        List<String> name = new ArrayList<String>();
        name.add(tag.getName());
        List<Post> postsWithTag = posts.findPostsByTags_NameIn(name);
        for (Post post : postsWithTag) {
            post.getTags().remove(tag);
            posts.save(post);
        }
        tags.delete(tag);
        return HttpStatus.OK;
    }

    @PutMapping("/tag/{id}/update")
    public ResponseEntity<Tag> updateTagById(@PathVariable int id, @RequestBody Map<String,String> tagFields) {
        if (id != Integer.parseInt(tagFields.get("id"))) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        Tag tagToUpdate = tags.findTagById(id);
        if (tagToUpdate == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        tagToUpdate.setName(tagFields.get("name"));
        tags.save(tagToUpdate);
        return new ResponseEntity<>(tags.findTagById(id), HttpStatus.OK);
    }


    @GetMapping("user/{id}/posts")
    public ResponseEntity<List<Post>> getPostsByUserId(@PathVariable int id) {
        return new ResponseEntity<>(posts.findPostsByUserId(id), HttpStatus.OK);
    }

    @PutMapping("/post/{id}/update")
    public ResponseEntity<Post> updatePostById(@PathVariable int id, @RequestBody Map<String,String> postFields) {

        if (id != Integer.parseInt(postFields.get("id"))) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        Post postToBeUpdated = posts.findById(id).orElse(null);
        if (postToBeUpdated == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        //UPDATES TITLE, DESCRIPTION, HOURLY RATE, IN PERSON, TAGS (RESETS TAGS)
        postToBeUpdated.setTitle(       postFields.get("title"));
        postToBeUpdated.setDescription( postFields.get("description"));
        postToBeUpdated.setHourlyRate(  Double.valueOf(postFields.get("hourlyRate")));
        postToBeUpdated.setInPerson(    Boolean.parseBoolean(postFields.get("inPerson")));

        // Tags of String format "1,2,3" with relevant ids
        String[] tagStrings = postFields.get("tags").split(",");
        postToBeUpdated.setTags(new HashSet<>());
        for (String tagId : tagStrings) {
            Tag tag = tags.findTagById(Integer.parseInt(tagId));
            if (tag != null) {
                postToBeUpdated.addTag(tag);
            } else {
                // Handle tag not found error
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        posts.save(postToBeUpdated);

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
    public ResponseEntity<Post> createPost(@RequestBody PostCreateDto body) {
        // Create a new Post object from the DTO
        Post newPost = body.getUserRole().equals("STUDENT") ? new Request() : new Offer();
        newPost.setTitle(body.getTitle());
        newPost.setDescription(body.getDescription());
        newPost.setInPerson(body.isInPerson());
        newPost.setHourlyRate(body.getHourlyRate());

        // Fetch user by user ID from the database
        Optional<User> user = users.findById(body.getUserId());
        user.ifPresent(newPost::setUser);
        if (user.isEmpty()) {
            // Handle user not found error
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Set tags to the post
        for (int tagId : body.getTags()) {
            Tag tag = tags.findTagById(tagId);
            if (tag != null) {
                newPost.addTag(tag);
            } else {
                // Handle tag not found error
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        // Save the new post
        Post savedPost = posts.save(newPost);

        // Return the saved post
        return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
    }

}
