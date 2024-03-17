
CREATE DATABASE location

CREATE TABLE signup (
    name VARCHAR(25),
    mobile VARCHAR(13) PRIMARY KEY,
    password VARCHAR(20)
);

CREATE TABLE location_history (
    id INT PRIMARY KEY auto_increment,
    mobile VARCHAR(13),
    location VARCHAR(100),
    time TIME, 
    FOREIGN KEY (mobile) REFERENCES signup(mobile)
);

