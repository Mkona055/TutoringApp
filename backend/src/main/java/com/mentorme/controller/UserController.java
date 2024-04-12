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
import com.mentorme.model.users.*;

@RestController
@RequestMapping()
@CrossOrigin
public class UserController {

    private AdminRepository admins;
    private StudentRepository students;
    private TutorRepository tutors;

    @Autowired
    public UserController(AdminRepository admins, StudentRepository students, TutorRepository tutors) {
        this.admins = admins;
        this.students = students;
        this.tutors = tutors;
    }

    @GetMapping("/users")
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
        return null;
    }

    @PostMapping("/createuser")
    public ResponseEntity<Void> createUser(@RequestBody User user){
        return null;
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Integer id) {
        return null;
    }
    
    @PutMapping("/user/update")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        return null;
    }

    



}
