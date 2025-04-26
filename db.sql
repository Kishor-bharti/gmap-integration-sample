CREATE DATABASE maps;
CREATE TABLE user_locations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- SELECT * FROM user_locations;
-- DROP TABLE user_locations;