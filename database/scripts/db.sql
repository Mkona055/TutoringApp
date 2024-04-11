CREATE SCHEMA IF NOT EXISTS TutoringApp;
USE TutoringApp;

CREATE TABLE User (
    user_Id INT AUTO_INCREMENT PRIMARY KEY,
    Location VARCHAR(50),
    fName VARCHAR(50),
    lName VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50),
    role VARCHAR(50)
);

CREATE TABLE Admin (
    admin_Id INT AUTO_INCREMENT PRIMARY KEY,
    user_Id INT,
    FOREIGN KEY (user_Id) REFERENCES User(user_Id)
);

CREATE TABLE Student (
    student_Id INT AUTO_INCREMENT PRIMARY KEY,
    user_Id INT,
    FOREIGN KEY (user_Id) REFERENCES User(user_Id)
);

CREATE TABLE Tutor (
    tutor_Id INT AUTO_INCREMENT PRIMARY KEY,
    user_Id INT,
    FOREIGN KEY (user_Id) REFERENCES User(user_Id)
);

CREATE TABLE Tag (
    tag_Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255)
);

CREATE TABLE Post (
    post_Id INT AUTO_INCREMENT PRIMARY KEY,
    inPerson BOOLEAN,
    postDesc VARCHAR(255),
    user_Id INT,
    hourly_rate DOUBLE,
    FOREIGN KEY (user_Id) REFERENCES User(user_Id)
);

CREATE TABLE PostTag (
    tag_Id INT,
    post_Id INT,
    isOffer BOOLEAN,
    PRIMARY KEY (tag_Id, post_Id, isOffer),
    FOREIGN KEY (tag_Id) REFERENCES Tag(tag_Id),
    FOREIGN KEY (post_Id) REFERENCES Post(post_Id)
);