INSERT INTO Event (Name, Address, Manager, Description, Score, Image, DaysID)
VALUES (
    'InovaWeek',
    'Vitória - ES',
    1,
    'Evento de inovação e tecnologia',
    0.0,
    'image.jpg',
    1
), (
    'Tech Expo',
    'São Paulo - SP',
    2,
    'Exposição de tecnologias emergentes',
    0.0,
    'techexpo.jpg',
    2
),(
    'GameFest',
    'Vila Velha - ES',
    2,
    'Festival de jogos e eSports',
    0.0,
    'gamefest.jpg',
    2
);

SELECT * FROM `Event`;