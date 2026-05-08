INSERT INTO Event (Name, Subtitle, Address, Manager, Description, Score, Image, Genres, Format, ContentRating, Copyright, DaysID)
VALUES (
    'InovaWeek',
    '2026',
    'Campus Boa Vista (UVV), Vila Velha',
    1,
    'No maior evento de inovação do estado, alunos apresentam projetos que podem mudar o mundo. Durante as exposições, visitantes avaliam estandes e descobrem o "absoluto segredo" do empreendedorismo moderno. Esta é a história de inovações que encontram desafios, mas alcançam o sucesso.',
    5.0,
    'image.jpg',
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
    'techexpo.jpg',
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
    'gamefest.jpg',
    JSON_ARRAY('Jogos', 'eSports'),
    JSON_ARRAY('Presencial'),
    'Livre para todos os públicos',
    '©Universidade Vila Velha / Notalise',
    3
);

SELECT * FROM `Event`;