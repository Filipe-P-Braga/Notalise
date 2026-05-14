DROP DATABASE IF EXISTS notalise;
CREATE DATABASE notalise;
USE notalise;

-- Tabela Imagens (
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

-- Tabela Days
CREATE TABLE Days (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Day DATE,
    StartHour TIME,
    FinishHour TIME
);

INSERT INTO Days (Day, StartHour, FinishHour)
VALUES ('2026-05-10', '09:00:00', '18:00:00');

-- Tabela Event
CREATE TABLE Event (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Address VARCHAR(255),
    Manager INT,
    Description TEXT,
    Score DECIMAL(3,2),
    Image VARCHAR(500),
    DaysID INT,
    FOREIGN KEY (DaysID) REFERENCES Days(ID),
    FOREIGN KEY (Manager) REFERENCES User(ID)
);

INSERT INTO Event (Name, Address, Manager, Description, Score, Image, DaysID)
VALUES (
    'InovaWeek',
    'Vitória - ES',
    1,
    'Evento de inovação e tecnologia',
    0.0,
    'image.jpg',
    1
);

-- Tabela Stands
CREATE TABLE Stands (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ID_Event INT NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Local VARCHAR(255),
    Score DECIMAL(3,2),
    DaysID INT,
    FOREIGN KEY (ID_Event) REFERENCES Event(ID),
    FOREIGN KEY (DaysID) REFERENCES Days(ID)
);

INSERT INTO Stands (ID_Event, Name, Local, Score, DaysID)
VALUES (1, 'Stand Tecnologia', 'Pavilhão A', 0.0, 1);


-- Tabela Comments
CREATE TABLE Comments (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Date DATE NOT NULL,
    StandsID INT,
    EventID INT,
    Score DECIMAL(3,2),
    UserID INT,
    Type VARCHAR(100),
    Text TEXT,
    FOREIGN KEY (StandsID) REFERENCES Stands(ID),
    FOREIGN KEY (EventID) REFERENCES `Event`(ID),
    FOREIGN KEY (UserID) REFERENCES User(ID)
);

INSERT INTO Comments (Date, StandsID, EventID, Score, UserID, Type, Text)
VALUES (
    CURDATE(),
    1,
    1,
    4.5,
    1,
    'Avaliação',
    'A avaliação foi realizada com sucesso e o stand apresentou um ótimo desempenho.'
);
-- Nova tabela baseada no mockup
CREATE TABLE UserActivity (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NULL,
    TipoUsuario VARCHAR(100) DEFAULT 'Anonimo',
    DataHora DATETIME,
    Avaliou BOOLEAN,
    
    FOREIGN KEY (UserID) REFERENCES User(ID)
);
INSERT INTO UserActivity (UserID, TipoUsuario, DataHora, Avaliou)
VALUES 
(1, 'Organizador', '2026-05-10 10:15:00', TRUE),
(1, 'Organizador', '2026-05-10 11:30:00', FALSE),

(NULL, 'Anonimo', '2026-05-10 12:00:00', TRUE),
(NULL, 'Anonimo', '2026-05-10 13:45:00', FALSE),

(1, 'Organizador', '2026-05-11 09:10:00', TRUE),
(NULL, 'Anonimo', '2026-05-11 14:20:00', TRUE),

(1, 'Organizador', '2026-05-12 16:00:00', FALSE),
(NULL, 'Anonimo', '2026-05-12 15:35:00', TRUE);

SELECT
    UA.ID,
    COALESCE(U.Name, 'Anonimo') AS NomeUsuario,
    UA.TipoUsuario,
    UA.DataHora,
    IF(UA.Avaliou, 'Sim', 'Não') AS Avaliou
FROM UserActivity UA
LEFT JOIN User U ON UA.UserID = U.ID;

SHOW TABLES;

DESCRIBE Imagens;
DESCRIBE User;
DESCRIBE Event;
DESCRIBE Stands;
DESCRIBE Days;
DESCRIBE Comments;

SELECT * FROM User;
