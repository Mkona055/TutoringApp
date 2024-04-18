DROP DATABASE IF EXISTS MentorMeTestDb;
CREATE DATABASE MentorMeTestDb;
DROP SCHEMA IF EXISTS MentorMeTestDb;
CREATE SCHEMA IF NOT EXISTS MentorMeTestDb;
USE MentorMeTestDb;

CREATE TABLE user
(
    id       INT AUTO_INCREMENT PRIMARY KEY,
    location VARCHAR(50),
    f_name   VARCHAR(50),
    l_name   VARCHAR(50),
    email    VARCHAR(50),
    password VARCHAR(500),
    `role`   VARCHAR(20)
);

CREATE TABLE tag
(
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE post
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(255),
    in_person   BOOLEAN,
    post_desc   VARCHAR(255),
    user_id     INT,
    hourly_rate DOUBLE,
    `type`      VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES User (id)
);

CREATE TABLE post_tag
(
    tag_id  INT,
    post_id INT,
    PRIMARY KEY (tag_id, post_id),
    FOREIGN KEY (tag_id) REFERENCES Tag (id),
    FOREIGN KEY (post_id) REFERENCES Post (id)
);

-- data
INSERT INTO tag (id, name)
VALUES (1, 'Swords'),
       (2, 'Horses');

INSERT INTO user (id, location, f_name, l_name, email, password, role)
VALUES (1, 'Rohan', 'Took', 'Peregrin', 'second.breakfast@gmail.com', 'wigs', 'STUDENT');

INSERT INTO post (id, title, in_person, post_desc, user_id, hourly_rate, type)
VALUES (1, 'Beacons have been lit', 1, 'Gondor calls for aid', 1, 10.0, 'REQUEST');

INSERT INTO post_tag (tag_id, post_id) VALUES (1,1), (2,1);

