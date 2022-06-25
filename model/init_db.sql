SET
    foreign_key_checks = 0;

--
-- Drop Tables
--
DROP TABLE IF EXISTS photos;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS service_post;

DROP TABLE IF EXISTS service_categories;

DROP TABLE IF EXISTS bookings;

DROP TABLE IF EXISTS messages;

DROP TABLE IF EXISTS tokens;

SET
    foreign_key_checks = 1;

--
-- Create Tables
--
CREATE TABLE photos (
    id INT NOT NULL AUTO_INCREMENT,
    fk_user_id INT NOT NULL,
    filename VARCHAR(100) NOT NULL,
    uploadedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

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
    hobbies TEXT(255),
    superpower TEXT(255),
    photo VARCHAR(100),
    fk_photos_id INT,
    password VARCHAR(200) NOT NULL,
    FOREIGN KEY (fk_photos_id) REFERENCES photos (id) ON DELETE CASCADE
);

INSERT INTO
    users (
        first_name,
        last_name,
        street,
        house_number,
        city_code,
        city_name,
        country,
        email,
        user_description,
        photo,
        password,
        fk_photos_id
    )
VALUES
    (
        'Admin',
        'Admin',
        '',
        '',
        null,
        '',
        '',
        'admin@gmail.com',
        "",
        "",
        '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W',
        null
    ),
    (
        'John',
        'Smith',
        'Carrer de Grassot',
        '101-A',
        08025,
        'Barcelona',
        'Spain',
        'johnsmith14062022@gmail.com',
        "Hi , I love pop-corn and see films with my family on Fridays",
        "/john-profile.jpg",
        '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W',
        null
    ),
    (
        'Karen',
        'Magnamara',
        'Carrer de Grassot',
        '85-B',
        08025,
        'Barcelona',
        'Spain',
        'karenmagnamara14062022@gmail.com',
        "Hi , I am Karen I would like to be able to have more time to spend with my child.",
        "/karen-profile.jpg",
        '$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6',
        null
    ),
    (
        'James',
        'Obrain',
        'Carrer de Grassot',
        '99',
        08025,
        'Barcelona',
        'Spain',
        'jamesobrain18062022@gmail.com',
        "Hi, I live with boyfriend and we have a fluffy dog called Mushroom",
        "/james-profile.jpg",
        '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W',
        null
    ),
    (
        'Tyrion',
        'Lannister',
        'Carrer de Grassot',
        '100',
        08025,
        'Barcelona',
        'Spain',
        'tyrionlannistes18062022@gmail.com',
        "Nice to meet you, I have just move to the neighborhood and I would like to know you. Carpentry is my passion. ",
        "/tyrion-profile.jpg",
        '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W',
        null
    ),
    (
        'Arya',
        'Stark',
        'Carrer de Grassot',
        '100',
        08025,
        'Barcelona',
        'Spain',
        'aryastark18062022@gmail.com',
        "Hi , I am Arya. I love do outdoor sports and travel. I work in IT department",
        "/arya-profile.jpg",
        '$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6',
        null
    ),
    (
        'Mary',
        'Poppins',
        'Carrer de Grassot',
        '89',
        08025,
        'Barcelona',
        'Spain',
        'marypoppins18062022@gmail.com',
        "Nice to meet you. I am Mery and always available to take care of kids because I miss my nephews",
        "/mary-profile.jpg",
        '$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6',
        null
    );

CREATE TABLE service_categories (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    category_title VARCHAR(100),
    picture VARCHAR(255)
);

INSERT INTO
    service_categories (category_title, picture)
VALUES
    ('System', ''
    ),
    (
        'Food',
        'https://img.freepik.com/free-vector/woman-standing-near-stove-kitchen-holding-spoon_74855-20425.jpg?w=1380&t=st=1655410861~exp=1655411461~hmac=db914b97910a24f02a17a4d78c5c4aebd7e37e93555dc6e58188ba6ba8cdb7bf'
    ),
    (
        'Home Services & Repairs',
        'https://img.freepik.com/free-vector/hand-drawn-people-taking-care-plants_23-2148986963.jpg?t=st=1655410934~exp=1655411534~hmac=67570d359a8bae25e59f311122fb6939eb8d4c3cb573c5b886802a97aa617c89&w=1380'
    ),
    (
        'Health & Wellness',
        'https://img.freepik.com/free-vector/happy-women-stand-floor-meditating-yoga-pose_90220-362.jpg?t=st=1655453854~exp=1655454454~hmac=fe29235f92351bc8ab93737cbdaac7a993e7bfd039478ea4dd76db34ff47d7e4&w=826'
    ),
    (
        'Hobbies',
        'https://img.freepik.com/free-vector/smiling-woman-standing-near-easel-painting-flat-illustration_74855-11057.jpg?t=st=1655411450~exp=1655412050~hmac=87025b42835fbdae42e7600f71204908dabf65d89184ae34f5b87d2c894d96b5&w=1480'
    ),
    (
        'Transport',
        'https://img.freepik.com/free-vector/carsharing-service-abstract-concept-illustration_335657-3739.jpg?t=st=1655411157~exp=1655411757~hmac=7633dacbf7346137c2703d63a2d830e2bcfe1a8fdd448fbdc0484aea922ad67d&w=996'
    ),
    (
        'Education',
        'https://img.freepik.com/free-vector/online-courses-tutorials_52683-37860.jpg?t=st=1655411487~exp=1655412087~hmac=c4e66347fa55e858861cd5a4ff52234b73a4b63a438163b1cf04c9ef48b8b8ff&w=1480'
    ),
    (
        'IT',
        'https://img.freepik.com/free-vector/low-code-development-concept-illustration_114360-7294.jpg?t=st=1655411530~exp=1655412130~hmac=d1afb77d212a8b49d9900e6c70a446b71eb1410552331bed8876696ffb2eefb0&w=1480'
    ),
    (
        'Children & Pets',
        'https://img.freepik.com/free-vector/happy-children-dog-playing-ball-outdoors_74855-6495.jpg?t=st=1655411265~exp=1655411865~hmac=06473b388c15c1b194dea26e709a7a21c84f046150ea79f54ed5a996eee794ea&w=1800'
    ),
    (
        'Bureaucracy',
        'https://img.freepik.com/free-vector/recruit-agent-analyzing-candidates_74855-4565.jpg?t=st=1655411604~exp=1655412204~hmac=39ad20c753927f00ac49a202ac92327fc22db887dbfb3c238ef543257e93c035&w=1800'
    ),
    (
        'Others',
        'https://img.freepik.com/free-vector/multicultural-people-standing-together_74855-6583.jpg?t=st=1655411363~exp=1655411963~hmac=eb287227c1080fad6841c2fad5fc99c1dc02ba2856cd224cd168b00dec70d2a9&w=2000'
    );

CREATE TABLE service_post (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    service_title VARCHAR(100),
    service_description TEXT(255),
    capacity INTEGER NOT NULL,
    donation TINYINT,
    fk_category_id INT,
    fk_provider_id INT,
    FOREIGN KEY (fk_provider_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (fk_category_id) REFERENCES service_categories (id) ON DELETE
    SET
        NULL
);

INSERT INTO
    service_post (
        service_title,
        service_description,
        capacity,
        donation,
        fk_category_id,
        fk_provider_id
    )
VALUES

    (
        'System Post',
        '',
        1,
        0,
        1,
        2
    ),
    (
        'System Post',
        '',
        1,
        0,
        1,
        3
    ),
    (
       'System Post',
        '',
        1,
        0,
        1,
        4
    ),
    (
        'System Post',
        '',
        1,
        0,
        1,
        5
    ),
    (
        'System Post',
        '',
        1,
        0,
        1,
        6
    ),
    (
         'System Post',
        '',
        1,
        0,
        1,
        7
    ),
    (
        'Babysitting',
        'I am open to spend time this week to take care of your children if you need it.',
        2,
        1,
        9,
        2
    ),
    (
        'Haircut',
        'I am a hairdresser and I am willing to cut your hair in my free time',
        1,
        0,
        4,
        3
    ),
    (
        'Explaing Math',
        'I can teach up to grade 8',
        1,
        0,
        7,
        5
    ),
    (
        'Making Paella with Rats',
        "I am from Valencia, I'm special",
        1,
        0,
        2,
        6
    ),
    (
        'Repair your laundry machine',
        'I can solve all problems by watching a youtube video',
        1,
        0,
        3,
        3
    ),
    (
        'Explaining Bootstrap',
        'Why learn vanilla CSS when all websites can look the same',
        1,
        0,
        8,
        4
    ),
    (
        'Planning my funeral',
        'I love Pinterest and sad music',
        1,
        0,
        11,
        3
    ),
    (
        'Take you to the airport',
        'I like driving, you like holiday?',
        1,
        0,
        6,
        5
    ),
    (
        'Polish your CV',
        'I work in HR and am great at closing the gap in your CV by inventing useless start-ups',
        1,
        0,
        10,
        3
    ),
    (
        'Teaching Guitar',
        'We can sit in a circle and sing Kumabaya my lord',
        1,
        0,
        5,
        6
    );

CREATE TABLE bookings (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    booking_description TEXT(255),
    proposed_date DATE,
    estimated_time INT,
    need_donation TINYINT,
    booking_status VARCHAR (100),
    fk_requestor_id INT,
    fk_service_post_id INT,
    FOREIGN KEY (fk_requestor_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (fk_service_post_id) REFERENCES service_post (id) ON DELETE
    SET
        NULL
);

INSERT INTO
    bookings (
        booking_description,
        estimated_time,
        need_donation,
        booking_status,
        fk_requestor_id,
        fk_service_post_id,
        proposed_date
    )
VALUES
(
        '',
        5,
        0,
        "accepted",
        1,
        1,
        "2022-06-23 14:41:13"
    ),
    (
        '',
        5,
        0,
        "accepted",
        1,
        2,
        "2022-06-23 14:41:13"
    ),
    (
        '',
        5,
        0,
        "accepted",
        1,
        3,
        "2022-06-23 14:41:13"
    ),
    (
        '',
        5,
        0,
        "accepted",
        1,
        4,
        "2022-06-23 14:41:13"
    ),
    (
        '',
        5,
        0,
        "accepted",
        1,
        5,
        "2022-06-23 14:41:13"
    ),
    (
        '',
        5,
        0,
        "accepted",
        1,
        6,
        "2022-06-23 14:41:13"
    ),
    (
        'Ok, I would appreciate some help with my kids this Saturday',
        4,
        1,
        "pending",
        5,
        7,
        "2022-06-23 14:41:13"
    ),
    (
        'Hi Karen! I would like to use your service, because I really need to cut my hair.',
        1,
        0,
        "pending",
        2,
        8,
        "2022-06-23 14:41:13"
    ),
    (
        'We will get married on Sunday, could you watch our children?',
        8,
        1,
        "pending",
        3,
        7,
        "2022-06-23 14:41:13"
    ),
    (
        'Hi Arya! Could I also borrow a guitar from you?',
        1,
        0,
        "pending",
        3,
        16,
        "2022-06-23 14:41:13"
    ),
    (
        'I want to apply at Flex & Kale, could you help me?',
        1,
        1,
        "pending",
        6,
        15,
        "2022-06-25 14:41:13"
    ),
    (
        'Can you fit three suitcases in your car? I am fleeing the country.',
        1,
        0,
        "pending",
        6,
        14,
        "2022-06-19 14:41:13"
    ),
    (
        'I love dealing with death, that sounds fun',
        1,
        1,
        "pending",
        4,
        13,
        "2022-06-23 14:41:13"
    ),
    (
        'I am a big fan of responsive design, I would love to learn this',
        1,
        0,
        "pending",
        6,
        12,
        "2022-06-23 15:41:13"
    ),
    (
        'It broke down half a year ago but maybe you can still fix it?',
        1,
        0,
        "pending",
        5,
        11,
        "2022-06-23 14:41:13"
    ),
    (
        'Can you also make Kimchi?',
        1,
        0,
        "pending",
        5,
        10,
        "2022-06-26 15:41:13"
    ),
    (
        "I still don't understand exponential growth, can you explain this to me?",
        1,
        0,
        "pending",
        3,
        9,
        "2022-06-23 15:41:13"
    );

CREATE TABLE messages (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    senderName VARCHAR(100) NOT NULL,
    text VARCHAR(250) NOT NULL,
    fk_booking_id INT NOT NULL,
    dateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_booking_id) REFERENCES bookings (id) ON DELETE CASCADE
);

CREATE TABLE tokens (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(100) UNIQUE NOT NULL,
    valid TINYINT NOT NULL
);