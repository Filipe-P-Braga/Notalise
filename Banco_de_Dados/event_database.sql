INSERT INTO Event (Name, Address, Manager, Description, Score, Image, DaysID)
VALUES (
    'InovaWeek',
    'Campus Boa Vista (UVV), Vila Velha',
    1,
    'No maior evento de inovação do estado, alunos apresentam projetos que podem mudar o mundo. Durante as exposições, visitantes avaliam estandes e descobrem o "absoluto segredo" do empreendedorismo moderno. Esta é a história de inovações que encontram desafios, mas alcançam o sucesso.',
    5.0,
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