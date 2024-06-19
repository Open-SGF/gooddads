CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) PRIMARY KEY,
    updated_at TIMESTAMP,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    CONSTRAINT username_length CHECK (CHAR_LENGTH(username) >= 3)
);

-- MySQL does not have row-level security, so this part is skipped.

-- Policies need to be implemented in the application logic.

-- Triggers and functions are handled differently in MySQL.
DROP TRIGGER IF EXISTS on_auth_user_created;

DELIMITER //
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth_users
FOR EACH ROW
BEGIN
    INSERT INTO users (id, full_name, avatar_url)
    VALUES (NEW.id, JSON_UNQUOTE(JSON_EXTRACT(NEW.raw_user_meta_data, '$.full_name')), JSON_UNQUOTE(JSON_EXTRACT(NEW.raw_user_meta_data, '$.avatar_url')));
END;
//
DELIMITER ;

-- Function to create user.
DELIMITER //
CREATE PROCEDURE create_user(
    IN first_name TEXT,
    IN last_name TEXT,
    IN street_address TEXT,
    IN city TEXT,
    IN zip_code TEXT,
    IN employer TEXT,
    IN cell_phone_number TEXT,
    IN home_phone_number TEXT,
    IN work_phone_number TEXT,
    IN alt_contact_number TEXT,
    IN merital_status TEXT,
    IN ethnicity TEXT,
    IN monthly_child_support FLOAT,
    IN children_names JSON,
    IN children_dob JSON,
    IN children_contact JSON,
    IN children_support JSON
)
BEGIN
    DECLARE user_id CHAR(36);
    DECLARE dad_id CHAR(36);

    INSERT INTO users (name) VALUES (first_name);
    SET user_id = LAST_INSERT_ID();

    INSERT INTO dads (user_id, region_id, street_address, city, zip_code, employer, email, cell_phone_number, home_phone_number, work_phone_number, alt_contact_number, marital_status, ethnicity, monthly_child_support)
    VALUES (user_id, region_id, street_address, city, zip_code, employer, email, cell_phone_number, home_phone_number, work_phone_number, alt_contact_number, marital_status, ethnicity, monthly_child_support);
    SET dad_id = LAST_INSERT_ID();

    -- Assuming JSON arrays are passed as strings
    DECLARE i INT DEFAULT 0;
    DECLARE children_count INT;
    SET children_count = JSON_LENGTH(children_names);

    WHILE i < children_count DO
        INSERT INTO children (dad_id, name, date_of_birth, contact, child_support)
        VALUES (dad_id, JSON_UNQUOTE(JSON_EXTRACT(children_names, CONCAT('$[', i, ']'))), JSON_UNQUOTE(JSON_EXTRACT(children_dob, CONCAT('$[', i, ']'))), JSON_UNQUOTE(JSON_EXTRACT(children_contact, CONCAT('$[', i, ']'))), JSON_UNQUOTE(JSON_EXTRACT(children_support, CONCAT('$[', i, ']'))));
        SET i = i + 1;
    END WHILE;
END;
//
DELIMITER ;

-- Enum types are handled differently in MySQL
-- Define columns using ENUM directly
CREATE TABLE IF NOT EXISTS dads (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    region_id CHAR(36),
    street_address VARCHAR(100),
    city VARCHAR(50),
    zip_code VARCHAR(5),
    employer VARCHAR(100),
    email TEXT,
    cell_phone_number VARCHAR(11),
    home_phone_number VARCHAR(11),
    work_phone_number VARCHAR(11),
    alt_contact_number VARCHAR(11),
    marital_status ENUM('single', 'married', 'divorced', 'widowed'),
    ethnicity ENUM('white', 'africanAmerican', 'nativeAmerican', 'asian', 'pacificIslander'),
    monthly_child_support FLOAT
);

CREATE TABLE IF NOT EXISTS class_assignments (
    id CHAR(36) PRIMARY KEY,
    dad_id CHAR(36) NOT NULL,
    class_id CHAR(36) NOT NULL
);

CREATE TABLE IF NOT EXISTS classes (
    id CHAR(36) PRIMARY KEY,
    region_id CHAR(36) NOT NULL
);

CREATE TABLE IF NOT EXISTS regions (
    id CHAR(36) PRIMARY KEY,
    description TEXT
);

CREATE TABLE IF NOT EXISTS programs (
    id CHAR(36) PRIMARY KEY,
    description VARCHAR(1000) NOT NULL,
    length INT NOT NULL
);

CREATE TABLE IF NOT EXISTS program_assignments (
    id CHAR(36) PRIMARY KEY,
    program_id CHAR(36) NOT NULL,
    class_id CHAR(36) NOT NULL,
    start_date DATE NOT NULL,
    completed BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS module_assignments (
    id CHAR(36) PRIMARY KEY,
    module_id CHAR(36) NOT NULL,
    event_date DATE NOT NULL,
    description VARCHAR(1000) NOT NULL
);

CREATE TABLE IF NOT EXISTS modules (
    id CHAR(36) PRIMARY KEY,
    program_id CHAR(36) NOT NULL,
    description VARCHAR(1000) NOT NULL
);

CREATE TABLE IF NOT EXISTS quizzes (
    id CHAR(36) PRIMARY KEY,
    module_id CHAR(36) NOT NULL,
    description VARCHAR(1000) NOT NULL
);

CREATE TABLE IF NOT EXISTS quiz_questions (
    id CHAR(36) PRIMARY KEY,
    quiz_id CHAR(36) NOT NULL,
    question VARCHAR(1000) NOT NULL,
    type ENUM('open', 'multipleChoice', 'check') NOT NULL
);

CREATE TABLE IF NOT EXISTS quiz_question_options (
    id CHAR(36) PRIMARY KEY,
    quiz_question_id CHAR(36) NOT NULL,
    answer VARCHAR(1000) NOT NULL,
    is_correct BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS quiz_assignments (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    quiz_question_id CHAR(36) NOT NULL,
    quiz_question_option_id CHAR(36),
    answer VARCHAR(1000) NOT NULL,
    is_correct BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS children (
    id CHAR(36) PRIMARY KEY,
    dad_id CHAR(36) NOT NULL,
    name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    contact VARCHAR(200) NOT NULL,
    child_support FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS responsible_party_assignments (
    id CHAR(36) PRIMARY KEY,
    responsible_party_id CHAR(36) NOT NULL,
    dad_id CHAR(36) NOT NULL
);

CREATE TABLE IF NOT EXISTS responsible_parties (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    phone_number VARCHAR(11) NOT NULL,
    role ENUM('caseWorker', 'probationOfficer') NOT NULL
);

-- Set up storage
INSERT INTO storage_buckets (id, name)
VALUES ('avatars', 'avatars')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Set up access controls for storage
-- Policies need to be implemented in the application logic
