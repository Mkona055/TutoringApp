package com.mentorme.controller;

import com.mentorme.dao.AdminRepository;
import com.mentorme.dao.StudentRepository;
import com.mentorme.dao.TutorRepository;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.function.Function;

import com.mentorme.model.users.*;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private final AdminRepository admins;
    private final StudentRepository students;
    private final TutorRepository tutors;

    @Autowired
    public UserController(AdminRepository admins, StudentRepository students, TutorRepository tutors) {
        this.admins = admins;
        this.students = students;
        this.tutors = tutors;
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> userList = new ArrayList<>();
        userList.addAll(admins.findAll());
        userList.addAll(students.findAll());
        userList.addAll(tutors.findAll());
        return new ResponseEntity<>(userList, HttpStatus.OK);   
    }

    @GetMapping("/students")
    public ResponseEntity<List<Student>> getAllStudents(){
        List<Student> studentList = students.findAll();
        return new ResponseEntity<>(studentList, HttpStatus.OK);
    }

    @GetMapping("/tutors")
    public ResponseEntity<List<Tutor>> getAllTutors(){
        List<Tutor> tutorList = tutors.findAll();
        return new ResponseEntity<>(tutorList, HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Integer id){
        Optional<User> user = admins.findById(id).map(Function.identity());
        if (user.isEmpty()) user = students.findById(id).map(Function.identity());
        if (user.isEmpty()) user = tutors.findById(id).map(Function.identity());
        return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/createuser")
    public ResponseEntity<Void> createUser(@RequestBody Map<String, String> requestBody) {
        String role = requestBody.get("role");
        if (role == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User user;
        switch (role) {
            case "ADMIN":
                user = new Admin();
                break;
            case "STUDENT":
                user = new Student();
                break;
            case "TUTOR":
                user = new Tutor();
                break;
            default:
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        user.setLocation(requestBody.get("location"));
        user.setEmail(requestBody.get("email"));
        user.setFirstName(requestBody.get("f_name"));
        user.setLastName(requestBody.get("l_name"));
        user.setPasswordHash(requestBody.get("password"));

        // Save the user based on its type
        if (user instanceof Admin) {
            admins.save((Admin) user);
        } else if (user instanceof Student) {
            students.save((Student) user);
        } else if (user instanceof Tutor) {
            tutors.save((Tutor) user);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Integer id) {
        Optional<Admin> admin = admins.findById(id);
        if (admin.isPresent()) {
            admins.delete(admin.get());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        Optional<Student> student = students.findById(id);
        if (student.isPresent()) {
            students.delete(student.get());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        Optional<Tutor> tutor = tutors.findById(id);
        if (tutor.isPresent()) {
            tutors.delete(tutor.get());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/user/update")
    public ResponseEntity<Void> updateUser(@RequestBody Map<String, String> requestBody) {
        String role = requestBody.get("role");
        if (role == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User user;
        switch (role) {
            case "ADMIN":
                user = new Admin();
                break;
            case "STUDENT":
                user = new Student();
                break;
            case "TUTOR":
                user = new Tutor();
                break;
            default:
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        int userId;
        try {
            userId = Integer.parseInt(requestBody.get("id")); // Assuming id is provided in the request body
        } catch (NumberFormatException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        user.setId(userId);
        user.setLocation(requestBody.get("location"));
        user.setEmail(requestBody.get("email"));
        user.setFirstName(requestBody.get("f_name"));
        user.setLastName(requestBody.get("l_name"));
        user.setPasswordHash(requestBody.get("password"));

        // Update the user based on its type
        if (user instanceof Admin && admins.existsById(user.getId())) {
            admins.save((Admin) user);
            return new ResponseEntity<>(HttpStatus.OK);
        } else if (user instanceof Student && students.existsById(user.getId())) {
            students.save((Student) user);
            return new ResponseEntity<>(HttpStatus.OK);
        } else if (user instanceof Tutor && tutors.existsById(user.getId())) {
            tutors.save((Tutor) user);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
