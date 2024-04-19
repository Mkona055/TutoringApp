package com.mentorme.controller;

import com.mentorme.TestApplicationConfiguration;
import com.mentorme.TestDatabaseInitialization;
import com.mentorme.model.users.Student;
import com.mentorme.model.users.Tutor;
import com.mentorme.model.users.User;
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
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = TestApplicationConfiguration.class)
public class UserControllerTest {

    UserController userController;

    @PersistenceContext
    EntityManager em;

    @Autowired
    public UserControllerTest(UserController userController){
        this.userController = userController;
    }

    @Transactional
    @BeforeEach
    void setUp() {
        TestDatabaseInitialization.initializeJpa(em);
    }

    @Transactional
    @Test
    void getAllUsersTest() {
        ResponseEntity<List<User>> re = userController.getAllUsers();
        assertTrue(re.getStatusCode().is2xxSuccessful());

        List<User> userListFromController = re.getBody();
        List<User> userListFromDb = em.createQuery("SELECT u FROM User u", User.class).getResultList();

        assertEquals(userListFromController.size(), userListFromDb.size());
        assertEquals(userListFromController, userListFromDb);

    }


    @Transactional
    @Test
    void getAllStudentsTest(){
        ResponseEntity<List<Student>> re = userController.getAllStudents();
        assertTrue(re.getStatusCode().is2xxSuccessful());

        List<Student> userListFromController = re.getBody();
        List<Student> userListFromDb =  em.createQuery("SELECT u FROM User u WHERE u.role = 'STUDENT'", User.class).getResultList()
                                                                                    .stream().map(user -> (Student) user).collect(Collectors.toList());

        assertEquals(userListFromController.size(), userListFromDb.size());
        assertEquals(userListFromController, userListFromDb);
    }

    @Transactional
    @Test
    void getAllTutorsTest(){
        ResponseEntity<List<Tutor>> re = userController.getAllTutors();
        assertTrue(re.getStatusCode().is2xxSuccessful());

        List<Tutor> userListFromController = re.getBody();
        List<Tutor> userListFromDb =  em.createQuery("SELECT u FROM User u WHERE u.role = 'TUTOR'", User.class).getResultList()
                                                                                    .stream().map(user -> (Tutor) user).collect(Collectors.toList());

        assertEquals(userListFromController.size(), userListFromDb.size());
        assertEquals(userListFromController, userListFromDb);
    }

    @Transactional
    @Test
    void getUserByIdTest(){
        ResponseEntity<User> re = userController.getUserById(1);
        assertTrue(re.getStatusCode().is2xxSuccessful());

        Student studentUserFromController = (Student) re.getBody();
        Student studentUserFromDb = (Student) em.createQuery("SELECT u FROM User u WHERE u.id = 1").getSingleResult();

        assertEquals(studentUserFromController, studentUserFromDb);

        ResponseEntity<User> re2 = userController.getUserById(3);
        assertTrue(re2.getStatusCode().is2xxSuccessful());

        Tutor tutorUserFromController = (Tutor) re2.getBody();
        Tutor tutorUserFromDb = (Tutor) em.createQuery("SELECT u FROM User u WHERE u.id = 3").getSingleResult();

        assertEquals(tutorUserFromController, tutorUserFromDb);

        ResponseEntity<User> re3 = userController.getUserById(20);
        assertTrue(re3.getStatusCode().is4xxClientError());
    }

    @Transactional
    @Test
    void createUserTest() {
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("role", "STUDENT");
        requestBody.put("location", "Test Location");
        requestBody.put("email", "test@example.com");
        requestBody.put("f_name", "Test");
        requestBody.put("l_name", "User");
        requestBody.put("password", "test123");

        ResponseEntity<Void> response = userController.createUser(requestBody);

        assertTrue(response.getStatusCode().is2xxSuccessful());
        Student createdStudent = em.createQuery("SELECT s FROM Student s WHERE s.email = 'test@example.com'", Student.class)
                                    .getSingleResult();
        
        assertNotNull(createdStudent);
        assertEquals("Test Location", createdStudent.getLocation());
        assertEquals("test@example.com", createdStudent.getEmail());
        assertEquals("Test", createdStudent.getFirstName());
        assertEquals("User", createdStudent.getLastName());

        ResponseEntity<List<User>> re = userController.getAllUsers();
        List<User> userListFromDb = em.createQuery("SELECT u FROM User u", User.class).getResultList();

        assertEquals(re.getBody().size(), userListFromDb.size());

        requestBody.replace("role", "INVALID");
        response = userController.createUser(requestBody);

        assertTrue(response.getStatusCode().is4xxClientError());

        requestBody.clear();
        response = userController.createUser(requestBody);
        assertTrue(response.getStatusCode().is4xxClientError());

    }

    @Transactional
    @Test
    void deleteUserTest() {
        int numUsersAfterDeleting = userController.getAllUsers().getBody().size() - 1;

        ResponseEntity<Void> response = userController.deleteUser(1);
        assertTrue(response.getStatusCode().is2xxSuccessful());

        ResponseEntity<List<User>> re = userController.getAllUsers();
        assertEquals(re.getBody().size(), numUsersAfterDeleting);

        response = userController.deleteUser(20);
        assertTrue(response.getStatusCode().is4xxClientError());
    }

    @Transactional
    @Test
    void updateUserTest() {
        Student student = (Student) em.createQuery("SELECT u FROM User u WHERE u.id = 1").getSingleResult();
        Student userBeforeUpdate = new Student(student);

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("id", "1");
        requestBody.put("role", "STUDENT");
        requestBody.put("location", "Montreal");
        requestBody.put("email", "r.changed@gmail.com");
        requestBody.put("f_name", "James12");
        requestBody.put("l_name", "User");
        requestBody.put("password", "test");

        ResponseEntity<Void> response = userController.updateUser(requestBody);

        assertTrue(response.getStatusCode().is2xxSuccessful());

        Student updatedStudent = (Student) userController.getUserById(1).getBody();
                    
        assertFalse(updatedStudent.equals(userBeforeUpdate));
        assertEquals("Montreal", updatedStudent.getLocation());
        assertEquals("James12", updatedStudent.getFirstName());
        

        requestBody.replace("role", "INVALID");
        response = userController.updateUser(requestBody);

        assertTrue(response.getStatusCode().is4xxClientError());

        requestBody.clear();
        response = userController.updateUser(requestBody);
        assertTrue(response.getStatusCode().is4xxClientError());
    }
}
