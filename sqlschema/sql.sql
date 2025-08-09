CREATE DATABASE IF NOT EXISTS pillprompt_db;
USE pillprompt_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'patient'
);

CREATE TABLE medications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  sex VARCHAR(50),
  medicine VARCHAR(100),
  dosage VARCHAR(100) NOT NULL,
  unit VARCHAR(20),
  notes VARCHAR(50),
  time TIME,
  frequency VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE reminders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  medication_id INT NOT NULL,
  time TIME,
  method VARCHAR(20) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (medication_id) REFERENCES medications(id)
);

CREATE TABLE dose_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  medication_id INT NOT NULL,
  taken_at DATETIME NOT NULL,
  status VARCHAR(20) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (medication_id) REFERENCES medications(id)
);
