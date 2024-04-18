package com.mentorme.controller;

import com.mentorme.TestApplicationConfiguration;
import com.mentorme.TestDatabaseInitialization;
import com.mentorme.dao.*;
import com.mentorme.model.Tag;
import com.mentorme.model.posts.Post;
import com.mentorme.model.posts.Request;
import com.mentorme.model.users.Student;
import com.mentorme.model.users.User;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;

//@WebMvcTest
//@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = TestApplicationConfiguration.class)
class PostControllerTest {

//    PostRepository postRepo;
//    UserRepository userRepo;
//    TagRepository tagRepo;
//    OfferRepository offerRepo;
//    RequestRepository requestRepository;

    PostController posts;

//    Post r;
    @PersistenceContext
    EntityManager em;

    @Autowired
    public PostControllerTest(PostController posts){//}, PostRepository postRepository){//}), UserRepository userRepository,TagRepository tagRepository) {
        this.posts = posts;
//        this.postRepo = postRepository;
//        this.userRepo = userRepository;
//        this.tagRepo = tagRepository;

//        User s = new Student();
//        s.setId(1);
//        s.setFirstName("Peregrin");
//        s.setLastName("Took");
//        s.setEmail("second.breakfast@gmail.com");
//        s.setLocation("Gondor");
//        s.setPasswordHash("wigs");
//        s.setRole("STUDENT");
//
////        userRepo.save(s);
//
//        Tag t1 = new Tag();
//        t1.setId(1);
//        t1.setName("Swords");
//        Tag t2 = new Tag();
//        t2.setId(2);
//        t2.setName("Horses");
//
////        tagRepo.save(t1);
////        tagRepo.save(t2);
//
//        r = new Request();
//        r.setId(1);
//        r.setDescription("Gondor calls for aid");
//        r.setHourlyRate(10.0);
//        r.setInPerson(true);
//        r.setTitle("The Beacons have been lit");
//        r.setUser(s);
//        r.addTag(t1);
//        r.addTag(t2);
    }

//    @Autowired
//    public PostControllerTest(PostRepository postRepo, PostController posts) {
//        this.postRepo = postRepo;
//        this.posts = posts;
//    }

    @Transactional
    @BeforeEach
    void setUp() {

        TestDatabaseInitialization.initializeJpa(em);
////        postRepo.deleteAll();
//
//        User s = new Student();
//        s.setId(1);
//        s.setFirstName("Peregrin");
//        s.setLastName("Took");
//        s.setEmail("second.breakfast@gmail.com");
//        s.setLocation("Gondor");
//        s.setPasswordHash("wigs");
//        s.setRole("STUDENT");
//
////        userRepo.save(s);
//
//        Tag t1 = new Tag();
//        t1.setId(1);
//        t1.setName("Swords");
//        Tag t2 = new Tag();
//        t2.setId(2);
//        t2.setName("Horses");
//
////        tagRepo.save(t1);
////        tagRepo.save(t2);
//
//        Request r = new Request();
//        r.setId(1);
//        r.setDescription("Gondor calls for aid");
//        r.setHourlyRate(10.0);
//        r.setInPerson(true);
//        r.setTitle("The Beacons have been lit");
//        r.setUser(s);
//        r.addTag(t1);
//        r.addTag(t2);
//
//        postRepo.save(r);
    }

    @Transactional
    @Test
    void getAllPostsTest() {
        ResponseEntity<List<Post>> re = posts.getAllPosts();

        // TO MAP createQuery to a post correctly you need to be very specific about the names of tables (Note the capital P)
        Post p = (Post) em.createQuery("SELECT p FROM Post p").getSingleResult();

        assertTrue(re.getStatusCode().is2xxSuccessful());
//        assertNotNull(re.getBody().getFirst());
        try {
            assertEquals(p, Objects.requireNonNull(re.getBody()).getFirst());
        } catch (Exception e) {
            fail("Should not throw error: " + e.getMessage());
        }
//        fail();
    }

//
//    @Transactional
//    @Test
//    void getPost() {
//        ResponseEntity<Post> re = posts.getPost(1);
//
//        assertTrue(re.getStatusCode().is2xxSuccessful());
//        try {
//            assertEquals(
//                    postRepo.findPostById(1),
//                    re.getBody()
//            );
//        } catch (Exception e) {
//            fail("Should not throw error: " + e.getMessage() + " : " + e.getCause());
//        }
//
//    }
//
//    @Transactional
//    @Test
//    void getPostsByTags() {
//        ResponseEntity<List<Post>> re = posts.getPostsByTags(List.of("Horses", "Swords"));
//
//        assertTrue(re.getStatusCode().is2xxSuccessful());
//        try {
//            assertNotNull(re.getBody(), "body was null and should not be");
//            assertEquals(re.getBody().getFirst(), postRepo.findPostById(1));
//        } catch (Exception e) {
//            fail("Should not throw error: " + e.getMessage() + " : " + e.getCause());
//        }
//
//        ResponseEntity<List<Post>> reEmpty = posts.getPostsByTags(List.of("Shields"));
//        assertTrue(re.getStatusCode().is2xxSuccessful());
//        try {
//            assertEquals(
//                    List.of(),
//                    reEmpty.getBody()
//            );
//        } catch (Exception e) {
//            fail("Should not throw error: " + e.getMessage() + " : " + e.getCause());
//        }
//    }
//
//    @Test
//    void getPostsFiltered() {
//        fail();
//    }
}