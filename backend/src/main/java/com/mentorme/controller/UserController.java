package com.mentorme.controller;

import com.mentorme.dao.AdminRepository;
import com.mentorme.dao.StudentRepository;
import com.mentorme.dao.TutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
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
}
