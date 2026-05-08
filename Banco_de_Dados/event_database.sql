INSERT INTO Event (Name, Subtitle, Address, Manager, Description, Score, Image, Genres, Format, ContentRating, Copyright, DaysID)
VALUES (
    'Google Brasil',
    '',
    'Google - São Paulo',
    1,
    'Evento do google pra googlar por ai. Pesquisar coisas pertinentes como porquê o pinguigm não voa e se eu jogar ele de um aviaão ele plana', 
    5.0,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNy800Zggg7_pv3Ld3JcFbSxNVRLln-h4UYA&s',
    JSON_ARRAY('Tecnologia', 'Inovação'),
    JSON_ARRAY('Presencial', 'Online'),
    'Livre para todos os públicos',
    '©Universidade Vila Velha / Notalise',
    1
), (
    'Tech Expo',
    '2.000',
    'São Paulo - SP',
    2,
    'Exposição de tecnologias emergentes',
    3.0,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfuysdyNsKy5fyg1sJa3IMv4uW1rE7MZIvbg&s',
    JSON_ARRAY('Tecnologia'),
    JSON_ARRAY('Presencial'),
    '+16 anos',
    '©Universidade Vila Velha / Notalise',
    2
),(
    'GameFest',
    'São Paulo Edition',
    'Vila Velha - ES',
    2,
    'Festival de jogos e eSports',
    4.0,
    'https://midias.em.com.br/_midias/jpg/2026/02/19/1200x720/1_gamefest-64501953.jpg?20260219175212?20260219175212',
    JSON_ARRAY('Jogos', 'eSports'),
    JSON_ARRAY('Presencial'),
    'Livre para todos os públicos',
    '©Universidade Vila Velha / Notalise',
    3
);

SELECT * FROM `Event`;