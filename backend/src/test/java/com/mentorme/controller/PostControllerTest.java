package com.mentorme.controller;

import com.mentorme.TestApplicationConfiguration;
import com.mentorme.TestDatabaseInitialization;
import com.mentorme.model.posts.Post;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;

//@WebMvcTest
//@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = TestApplicationConfiguration.class)
class PostControllerTest {

    PostController posts;

    //    Post r;
    @PersistenceContext
    EntityManager em;

    @Autowired
    public PostControllerTest(PostController posts) {//}, PostRepository postRepository){//}), UserRepository userRepository,TagRepository tagRepository) {
        this.posts = posts;
    }

    @Transactional
    @BeforeEach
    void setUp() {

        TestDatabaseInitialization.initializeJpa(em);

    }

    @Transactional
    @Test
    void getAllPostsTest() {
        ResponseEntity<List<Post>> re = posts.getAllPosts();

        // TO MAP createQuery to a post correctly you need to be very specific about the names of tables (Note the capital P)
        List<Post> postList = em.createQuery("SELECT p FROM Post p", Post.class).getResultList();

        assertTrue(re.getStatusCode().is2xxSuccessful());
        try {
            assertEquals(postList, Objects.requireNonNull(re.getBody()));
        } catch (Exception e) {
            fail("Should not throw error: " + e.getMessage());
        }
//        fail();
    }

    @Transactional
    @Test
    void getPostsFiltered() {
        ResponseEntity<List<Post>> allThree = posts.getPostsFiltered(List.of("Horses"), 100.0, "Rohan");
        ResponseEntity<List<Post>> justTags = posts.getPostsFiltered(List.of("Horses"), null, null);
        ResponseEntity<List<Post>> justRate = posts.getPostsFiltered(null, 100.0, null);
        ResponseEntity<List<Post>> justLocation = posts.getPostsFiltered(null, null, "Rohan");

        List<Post> p = em.createQuery("SELECT p FROM Post p WHERE id = 1", Post.class).getResultList();

        assertEquals(p, allThree.getBody());
        assertEquals(p, justTags.getBody());
        assertEquals(p, justRate.getBody());
        assertEquals(p, justLocation.getBody());

    }

    @Transactional
    @Test
    void updatePostByIdTest() {
        Map<String,String> map = new HashMap<>();
        map.put("id", "1");
        map.put("title", "New Title");
        map.put("description", "New Description");
        map.put("hourlyRate", "10.0");
        map.put("inPerson", "true");
        map.put("tags", "2");


        posts.updatePostById(1, map);

        assertEquals("New Description", posts.getPost(1).getBody().getDescription());
    }

    // ran out of time, tests non-exhaustive
}