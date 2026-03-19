DROP DATABASE IF EXISTS notalise;
CREATE DATABASE notalise;
USE notalise;
-- Tabela User
CREATE TABLE User (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Tipo VARCHAR(100),
    email VARCHAR(255) NOT NULL
);

-- Tabela Event
CREATE TABLE Event (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Address VARCHAR(255),
    manager INT,
    Description TEXT,
    FOREIGN KEY (Manager) REFERENCES User(ID)
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

-- Tabela Days
CREATE TABLE Days (
    ID_Event INT,
    Day DATE,
    StartHour TIME,
    FinishHour TIME,
    PRIMARY KEY (ID_Event, Day),
    FOREIGN KEY (ID_Event) REFERENCES Event(ID)
);

-- Tabela Comments (com as FKs conforme especificado)
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