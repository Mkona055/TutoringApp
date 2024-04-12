DROP SCHEMA  IF EXISTS MentorMeDb;
CREATE SCHEMA IF NOT EXISTS MentorMeDb;
USE MentorMeDb;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location VARCHAR(50),
    f_name VARCHAR(50),
    l_name VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50),
    `role` VARCHAR(20)
);

CREATE TABLE tag (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE post (
    id INT AUTO_INCREMENT PRIMARY KEY,
    in_person BOOLEAN,
    post_desc VARCHAR(255),
    user_id INT,
    hourly_rate DOUBLE,
    `type` VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE post_tag (
    tag_id INT,
    post_id INT,
    PRIMARY KEY (tag_id, post_id),
    FOREIGN KEY (tag_id) REFERENCES Tag(id),
    FOREIGN KEY (post_id) REFERENCES Post(id)
);