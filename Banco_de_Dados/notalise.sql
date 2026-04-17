DROP DATABASE IF EXISTS notalise;
CREATE DATABASE notalise;
USE notalise;

-- Tabela Imagens (CORRIGIDA)
CREATE TABLE Imagens (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(255),
    Dados VARCHAR(255)
);

-- Tabela User
CREATE TABLE User (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Tipo VARCHAR(100),
    email VARCHAR(255) NOT NULL
);

INSERT INTO User (Name, Tipo, email)
VALUES ('Lucas', 'Organizador', 'lucas@gmail.com');

-- Tabela Event
CREATE TABLE Event (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Address VARCHAR(255),
    Manager INT,
    Description TEXT,
    Score DECIMAL(3,2),
    Image VARCHAR(500),
    FOREIGN KEY (Manager) REFERENCES User(ID)
);

INSERT INTO Event (Name, Address, Manager, Description, Score)
VALUES (
    'InovaWeek',
    'Vitória - ES',
    1,
    'Evento de inovação e tecnologia',
    0.0
);

-- Tabela Stands
CREATE TABLE Stands (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ID_Event INT NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Local VARCHAR(255),
    Score DECIMAL(3,2),
    FOREIGN KEY (ID_Event) REFERENCES Event(ID)
);

INSERT INTO Stands (ID_Event, Name, Local, Score)
VALUES (1, 'Stand Tecnologia', 'Pavilhão A', 0.0);

-- Tabela Days
CREATE TABLE Days (
    ID_Event INT,
    Day DATE,
    StartHour TIME,
    FinishHour TIME,
    PRIMARY KEY (ID_Event, Day),
    FOREIGN KEY (ID_Event) REFERENCES Event(ID)
);

INSERT INTO Days (ID_Event, Day, StartHour, FinishHour)
VALUES (1, '2026-05-10', '09:00:00', '18:00:00');

-- Tabela Comments
CREATE TABLE Comments (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Date DATE NOT NULL,
    StandsID INT NOT NULL,
    Score DECIMAL(3,2),
    UserID INT,
    Type VARCHAR(100),
    Text TEXT,
    FOREIGN KEY (StandsID) REFERENCES Stands(ID),
    FOREIGN KEY (UserID) REFERENCES User(ID)
);

INSERT INTO Comments (Date, StandsID, Score, UserID, Type, Text)
VALUES (
    CURDATE(),
    1,
    4.5,
    1,
    'Avaliação',
    'A avaliação foi realizada com sucesso e o stand apresentou um ótimo desempenho.'
);

SHOW TABLES;

DESCRIBE Imagens;
DESCRIBE User;
DESCRIBE Event;
DESCRIBE Stands;
DESCRIBE Days;
DESCRIBE Comments;
