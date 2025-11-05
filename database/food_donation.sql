CREATE DATABASE IF NOT EXISTS food_donation CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE food_donation;


-- Users
CREATE TABLE IF NOT EXISTS users (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
email VARCHAR(120) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
role ENUM('donor','recipient','admin') NOT NULL DEFAULT 'donor',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;


-- Donations
CREATE TABLE IF NOT EXISTS donations (
id INT PRIMARY KEY AUTO_INCREMENT,
donor_id INT NOT NULL,
food_type VARCHAR(100) NOT NULL,
quantity VARCHAR(50) NOT NULL,
expiry_date DATE NOT NULL,
location VARCHAR(200) NOT NULL,
contact VARCHAR(120) NOT NULL,
status ENUM('pending','collected','delivered') NOT NULL DEFAULT 'pending',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT fk_donations_user FOREIGN KEY (donor_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;


-- Sample data (optional)
INSERT INTO users(name,email,password,role) VALUES
('Admin','admin@example.com','$2b$10$O6i7OQaK8bKq9bq0i0n1ae5k2o4uG1r2gRrJv6L2Q.7l8g9Q7a8Qq','admin');
-- NOTE: Replace the above hash with a real bcrypt hash or register via API.