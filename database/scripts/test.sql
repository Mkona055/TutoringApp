DROP SCHEMA  IF EXISTS MentorMeTestDb;
CREATE SCHEMA IF NOT EXISTS MentorMeTestDb;
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

-- data

USE mentormedb;

-- Insert mock data into the user table
INSERT INTO user (location, f_name, l_name, email, password, `role`)
VALUES
    ('New York', 'John', 'Doe', 'john.doe@example.com', 'password123', 'ADMIN'),
    ('Los Angeles', 'Jane', 'Smith', 'jane.smith@example.com', 'password456', 'STUDENT'),
    ('Chicago', 'Michael', 'Johnson', 'michael.johnson@example.com', 'password789', 'TUTOR'),
    ('San Francisco', 'Emily', 'Wilson', 'emily.wilson@example.com', 'password111', 'STUDENT'),
    ('Seattle', 'David', 'Lee', 'david.lee@example.com', 'password222', 'STUDENT'),
    ('Boston', 'Sophia', 'Anderson', 'sophia.anderson@example.com', 'password333', 'STUDENT'),
    ('Austin', 'Ethan', 'Martinez', 'ethan.martinez@example.com', 'password444', 'TUTOR'),
    ('Denver', 'Olivia', 'Taylor', 'olivia.taylor@example.com', 'password555', 'TUTOR'),
    ('Houston', 'Noah', 'Garcia', 'noah.garcia@example.com', 'password666', 'TUTOR');

-- Insert mock data into the tag table
INSERT INTO tag (name)
VALUES
    ('Java'),
    ('Python'),
    ('JavaScript'),
    ('HTML'),
    ('CSS'),
    ('React');

-- Insert mock data into the post table
INSERT INTO post (in_person, post_desc, user_id, hourly_rate, `type`)
VALUES
    (true, 'Looking for Java tutor', 3, 50.00, 'REQUEST'),
    (false, 'Remote Python tutoring available', 3, 40.00, 'OFFER'),
    (true, 'Need help with CSS', 8, 45.00, 'REQUEST');

-- Insert mock data into the post_tag table
INSERT INTO post_tag (tag_id, post_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 2),
    (4, 3),
    (5, 3);