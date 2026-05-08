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
    Subtitle VARCHAR(255),
    Address VARCHAR(255),
    Manager INT,
    Description TEXT,
    Score DECIMAL(3,2),
    Image VARCHAR(500),
    Genres JSON,
    Format JSON, 
    ContentRating VARCHAR(255) DEFAULT 'Livre para todos os públicos',
    Copyright VARCHAR(255),
    DaysID INT,
    FOREIGN KEY (DaysID) REFERENCES Days(ID),
    FOREIGN KEY (Manager) REFERENCES User(ID)
);

INSERT INTO Event (Name, Subtitle, Address, Manager, Description, Score, Image, Genres, Format, ContentRating, Copyright, DaysID)
VALUES (
    'InovaWeek',
    '2026',
    'Vitória - ES',
    1,
    'Evento de inovação e tecnologia',
    0.0,
    'https://cdn.esbrasil.com.br/wp-content/uploads/2025/09/Texto-do-seu-paragrafo-19.jpg',
    JSON_ARRAY('Tecnologia', 'Inovação'),
    JSON_ARRAY('Palestra', 'Workshop'),
    'Livre para todos os públicos',
    '©Universidade Vila Velha / Notalise',
    1
);

-- Tabela Stands
CREATE TABLE Stands (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ID_Event INT NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Subtitle VARCHAR(255),
    Local VARCHAR(255),
    Description TEXT,
    Score DECIMAL(3,2),
    Image VARCHAR(500),
    Genres JSON,
    Format JSON, 
    ContentRating VARCHAR(255) DEFAULT 'Livre para todos os públicos',
    Copyright VARCHAR(255),
    DaysID INT,
    FOREIGN KEY (ID_Event) REFERENCES Event(ID),
    FOREIGN KEY (DaysID) REFERENCES Days(ID)
);

INSERT INTO Stands (ID_Event, Name, Subtitle, Local, Description, Score, Image, Genres, Format, ContentRating, Copyright, DaysID)
VALUES (1, 'Notalise', 'Sua opinião importa', 'Pavilhão A', 'Uma plataforma para a avaliação de stands', 5.0, 'https://blog.even3.com.br/wp-content/uploads/2021/03/carreira-de-pesquisador-1-1.png', JSON_ARRAY('Tecnologia', 'Inovação', 'Negócios', 'Universitário'), JSON_ARRAY('Presencial'), 'Livre para todos os públicos', '©Universidade Vila Velha / Notalise', 1);


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

SHOW TABLES;

DESCRIBE Imagens;
DESCRIBE User;
DESCRIBE Event;
DESCRIBE Stands;
DESCRIBE Days;
DESCRIBE Comments;

SELECT * FROM User;