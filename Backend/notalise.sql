CREATE DATABASE notalise;
USE notalise;

CREATE TABLE evento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    local VARCHAR(100),
    data_evento DATE
);