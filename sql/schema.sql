-- Database name: back_end_project

-- DROP TABLE users;
-- DROP TABLE reviews;
-- DROP TABLE resources;
-- DROP TABLE activity_log;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(200),
    password VARCHAR(200),
    about VARCHAR(500),

    profile_picture VARCHAR(200)
    -- status VARCHAR(200),
    -- study_points INTEGER
    -- group/friends list

);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    resource_id INTEGER REFERENCES resources(id),

    stars DECIMAL CHECK (stars >= 1 and stars <=5),
    content VARCHAR(500)

);

CREATE TABLE resources (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    type VARCHAR(200),
    description VARCHAR(500),
    url VARCHAR(200)    

);

CREATE TABLE activity_log (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    resource_id INTEGER REFERENCES resources(id),

    activity_name VARCHAR(200),
    activity_description VARCHAR(500),
    date_completed DATE DEFAULT NOW(),
    hours_spent DECIMAL DEFAULT 0
);



INSERT INTO users (first_name, last_name, email, password, about)
    VALUES ('Prescott', 'Sun', 'sunprescott@gmail.com', 'password', 'I am a student at DigitalCrafts')
    ;

INSERT INTO resources (title, type, description, url)
    VALUES ('Test Resource', 'Video Tutorial', 'A video tutorial on RESTful Node APIs', 'https://www.youtube.com/watch?v=vjf774RKrLc')
    ;

INSERT INTO reviews (user_id, resource_id, stars, content)
    VALUES (1, 1, 5, 'This test resource is great')
    ;

INSERT INTO activity_log (user_id, resource_id, activity_name, activity_description, date_completed, hours_spent)
    VALUES (1, 1, 'Watching video tutorial', 'Watched the whole video tutorial', '10/23/2019', 2)
    ;
