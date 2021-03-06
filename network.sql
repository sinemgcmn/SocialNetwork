DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS reset_codes;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id            SERIAL PRIMARY KEY,
    first_name    VARCHAR NOT NULL CHECK (first_name <> ''),
    last_name     VARCHAR NOT NULL CHECK (last_name <> ''),
    bio           VARCHAR,
    email         VARCHAR NOT NULL UNIQUE CHECK (email <> ''),
    password_hash VARCHAR NOT NULL CHECK (password_hash <> ''),
    imageUrl      VARCHAR,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reset_codes (
    id            SERIAL PRIMARY KEY,
    email         VARCHAR NOT NULL UNIQUE REFERENCES users (email),
    secret_code   VARCHAR NOT NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships ( 
    id            SERIAL PRIMARY KEY, 
    sender_id     INT REFERENCES users(id) NOT NULL, 
    recipient_id  INT REFERENCES users(id) NOT NULL, 
    accepted      BOOLEAN DEFAULT false
);

CREATE TABLE messages ( 
    id            SERIAL PRIMARY KEY, 
    sender_id     INT REFERENCES users(id) NOT NULL,
    chat          VARCHAR, 
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);