-- CREATE DATABASE immersive;

CREATE SCHEMA vr;

CREATE TABLE IF NOT EXISTS vr.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    md5password VARCHAR(256),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- qwerty --
INSERT INTO vr.users (email, md5password) VALUES ('admin@dilan.app', 'd8578edf8458ce06fbc5bb76a58c5ca4');


CREATE TABLE IF NOT EXISTS vr.companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(265),
    website VARCHAR(265),
    phone VARCHAR(256),
    address VARCHAR(265),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO vr.companies (name, email, website, phone) VALUES ('Apple Inc.', 'info@apple.com', 'apple.com', '(555) 90-87-65');
INSERT INTO vr.companies (name, email, website, phone) VALUES ('Microsoft Corporation', 'info@microsoft.com', 'microsoft.com', '(555) 80-12-45');
INSERT INTO vr.companies (name, email, website, phone) VALUES ('Amazon Inc.', 'info@amazon.com', 'amazon.com', '(555) 50-39-35');

CREATE TABLE vr.employees (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(256),
    lastname  VARCHAR(256),
    email VARCHAR(256),
    company_id INT NOT NULL,
    phone VARCHAR(256),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES vr.companies (id)
);

INSERT INTO vr.employees (firstname, lastname, email, company_id) VALUES ('Tim','Cook','tim.cook@apple.com', 1);
INSERT INTO vr.employees (firstname, lastname, email, company_id) VALUES ('John','Smith','john.smith@apple.com', 1);
INSERT INTO vr.employees (firstname, lastname, email, company_id) VALUES ('Craig','Federighi','craig.federighi@apple.com', 1);
