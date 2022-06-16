SET foreign_key_checks = 0;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS service_post;
DROP TABLE IF EXISTS service_categories; 
SET foreign_key_checks = 1;

CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    street VARCHAR(100),
    house_number VARCHAR(100),
    city_code INT,
    city_name VARCHAR(100),
    country VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    user_description TEXT(255),
    photo VARCHAR(100) 
);

INSERT INTO users (first_name, last_name, street, house_number, city_code, city_name, country, email, user_description, photo) VALUES ('John', 'Smith', 'Carrer de Grassot', '101-A', 08025, 'Barcelona', 'Spain','johnsmith14062022@gmail.com', "Hi , I love pop-corn and see films with my family on Fridays", ""), ('Karen', 'Magnamara', 'Carrer de Grassot', '85-B', 08025, 'Barcelona', 'Spain','karenmagnamara14062022@gmail.com', "Hi , I'm Karen I would like to be able to have more time to spend with my child.", "");

CREATE TABLE service_categories (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    category_title VARCHAR(100), 
    photo VARCHAR(100)
); 

INSERT INTO service_categories (category_title, photo) 
VALUES ('Food',''), ('Home Services & Repairs',''), ('Health & Wellness', ''), ('Hobbies', ''), ('Transport', ''), ('Education', ''), ('IT', ''), ('Children & Pets', ''), ('Bureaucracy', ''), ('Others', ''); 

CREATE TABLE service_post (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    service_title VARCHAR(100),
    service_description TEXT(255),
    capacity INTEGER NOT NULL,
    donation TINYINT,
    fk_category_id INT,
    fk_provider_id INT,
    FOREIGN KEY (fk_provider_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (fk_category_id) REFERENCES service_categories (id) ON DELETE SET NULL
);

INSERT INTO service_post (service_title, service_description, capacity, fk_category_id, fk_provider_id) 
VALUES ('Babysitting', 'I am open to spend time this week to take care of your children if you need it.', 2, 8, 1), ('Haircut', 'I am a hairdresser and I am willing to cut your hair in my free time', 1, 3, 2); 




