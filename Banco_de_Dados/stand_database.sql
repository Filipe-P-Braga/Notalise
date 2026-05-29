INSERT INTO Stands (ID_Event, Name, Subtitle, Local, Description, Score, Image, Genres, Format, ContentRating, Copyright, DaysID)
VALUES 

-- Google Brasil
(
    1,
    'Google Cloud Lab',
    'Cloud & IA',
    'Pavilhão A',
    'Stand voltado para demonstrações de IA, Google Cloud e soluções inteligentes para empresas.',
    4.9,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNy800Zggg7_pv3Ld3JcFbSxNVRLln-h4UYA&s',
    JSON_ARRAY('Tecnologia', 'IA', 'Cloud'),
    JSON_ARRAY('Presencial'),
    '',
    '',
    1
),

-- Tech Expo
(
    2,
    'Future Devices',
    'Tecnologia do Futuro',
    'Pavilhão B',
    'Apresentação de dispositivos tecnológicos inovadores e experiências interativas.',
    4.2,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfuysdyNsKy5fyg1sJa3IMv4uW1rE7MZIvbg&s',
    JSON_ARRAY('Tecnologia', 'Inovação'),
    JSON_ARRAY('Presencial'),
    '',
    '',
    2
),

-- GameFest
(
    3,
    'Arena Gamer Pro',
    'eSports Arena',
    'Pavilhão C',
    'Competições de eSports, free play e experiências gamer para o público.',
    4.8,
    'https://midias.em.com.br/_midias/jpg/2026/02/19/1200x720/1_gamefest-64501953.jpg?20260219175212?20260219175212',
    JSON_ARRAY('Jogos', 'eSports'),
    JSON_ARRAY('Presencial'),
    '',
    '',
    3
),

(
    3,
    'Retro Games',
    'Clássicos dos Games',
    'Pavilhão D',
    'Espaço dedicado aos videogames clássicos e experiências nostálgicas.',
    4.5,
    'https://cdn-icons-png.flaticon.com/512/686/686589.png',
    JSON_ARRAY('Jogos', 'Retro'),
    JSON_ARRAY('Presencial'),
    '',
    '',
    3
),

-- Rio Summit Week
(
    4,
    'AI Vision',
    'Machine Learning',
    'Pavilhão A',
    'Demonstrações de inteligência artificial aplicada ao mercado e automação.',
    4.9,
    'https://s2.glbimg.com/O_z6ddxuZ6xA28LMpr1-mPMbDY0=/620x300/e.glbimg.com/og/ed/f/original/2022/01/11/rio-innovation-week-1.jpg',
    JSON_ARRAY('IA', 'Machine Learning'),
    JSON_ARRAY('Presencial'),
    '',
    '',
    3
),

-- Brasil AI Summit
(
    5,
    'Deep Learning Space',
    'IA Generativa',
    'Pavilhão B',
    'Experiências com inteligência artificial generativa e automação avançada.',
    5.0,
    'https://www.showmetech.com.br/wp-content/uploads//2026/01/image-378-1024x536.webp',
    JSON_ARRAY('IA', 'Tecnologia'),
    JSON_ARRAY('Presencial'),
    '',
    '',
    4
),

-- Minas Summit
(
    6,
    'Startup Valley',
    'Networking',
    'Pavilhão C',
    'Espaço voltado para startups, networking e inovação tecnológica.',
    4.6,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdSzDxXDoDE00E_UDcEFNMYph3N1v_jxveGw&s',
    JSON_ARRAY('Startup', 'Tecnologia'),
    JSON_ARRAY('Presencial'),
    '',
    '',
    5
),

-- TDC Experience
(
    7,
    'Code Masters',
    'Desenvolvimento',
    'Pavilhão D',
    'Stand com workshops e demonstrações de desenvolvimento de software.',
    4.8,
    'https://www.listadeeventos.com.br/storage/events/77b70b1c-f1fe-42a4-b8ce-d6794234d16d.webp',
    JSON_ARRAY('Programação', 'Cloud'),
    JSON_ARRAY('Presencial'),
    '',
    '',
    6
),

-- Digital Tech Show
(
    8,
    'Digital World',
    'Transformação Digital',
    'Pavilhão A',
    'Apresentação de soluções digitais e tecnologias empresariais.',
    4.7,
    'https://docmanagement.com.br/wp-content/uploads/2025/07/DIGITAL-TECH-SHOW-823x450.png',
    JSON_ARRAY('Tecnologia', 'Digital'),
    JSON_ARRAY('Presencial'),
    '',
    '',
    7
),

-- Energy Show
(
    9,
    'Green Energy Hub',
    'Energia Sustentável',
    'Pavilhão E',
    'Stand voltado para energias renováveis e inovação sustentável.',
    4.9,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJMTnpqNpUjrpy8NvdPb4TLRX_KotS5MR4uA&s',
    JSON_ARRAY('Energia', 'Sustentabilidade'),
    JSON_ARRAY('Presencial'),
    '',
    '',
    8
),

-- CSBC
(
    10,
    'Academic Tech',
    'Pesquisa & Computação',
    'Pavilhão F',
    'Espaço acadêmico voltado para computação, pesquisa e inovação científica.',
    4.8,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAAjlcP7T4hFQmFuE07oZ2aqf-91N0tezUyw&s',
    JSON_ARRAY('Computação', 'Pesquisa'),
    JSON_ARRAY('Presencial'),
    '',
    '',
    9
),

-- WPMC
(
    11,
    'Wireless Future',
    'Mobile Tech',
    'Pavilhão G',
    'Demonstrações de redes móveis, computação sem fio e inovação tecnológica.',
    4.7,
    'https://arquivista.imd.ufrn.br/fileservice/file/019e2663-ef47-713e-9a1d-314440c36fd4?key=f72e37212fb44d8d077ad4f5667ad72df2a66eb5ecedb2357e6509319e14fdf0',
    JSON_ARRAY('Redes', 'Mobile'),
    JSON_ARRAY('Presencial'),
    '',
    '',
    10
);

SELECT * FROM Stands;