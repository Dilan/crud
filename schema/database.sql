CREATE DATABASE immersive;

CREATE SCHEMA vr;

CREATE TABLE IF NOT EXISTS vr.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    md5password VARCHAR(256),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- qwerty --
INSERT INTO vr.users VALUES (1, 'admin@dilan.app', 'd8578edf8458ce06fbc5bb76a58c5ca4');


CREATE TABLE IF NOT EXISTS vr.companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(265),
    website VARCHAR(265),
    address VARCHAR(265),
    phone VARCHAR(256),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO vr.companies VALUES (1, 'Apple Inc.', 'AAPL','(555) 90-87-65');
INSERT INTO vr.companies VALUES (2, 'Microsoft Corporation', 'MSFT', '(555) 80-12-45');
INSERT INTO vr.companies VALUES (3, 'Amazon Inc.', 'AMZN', '(555) 50-39-35');

CREATE TABLE vr.employees (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(256),
    lastname  VARCHAR(256),
    phone VARCHAR(256),
    email VARCHAR(256),
    company_id INT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES vr.companies (id)
);

INSERT INTO vr.employees VALUES (1,'Tim','Cook','tim.cook@apple.com', 1);
INSERT INTO vr.employees VALUES (2,'John','Smith','john.smith@apple.com', 1);
INSERT INTO vr.employees VALUES (3,'Craig','Federighi','craig.federighi@apple.com', 1);
