INSERT INTO Comments (Date, StandsID, EventID, Score, UserID, Type, Text)
VALUES 

-- Comentários de STANDS (EventID = NULL)
('2023-05-10', 1, NULL, 5.0, 1, 'Organizador', 'Comentário sobre o stand Notalise'),
('2023-05-10', 2, NULL, 4.0, 1, 'Expositor', 'Comentário sobre o stand Fanclube do Senhor do Fogo Zuko'),
('2023-05-10', 3, NULL, 3.0, 1, 'Visitante', 'Comentário sobre o stand Porquê o Robotinic odeia o Sonic'),
('2023-05-11', 2, NULL, 4.8, 4, 'Visitante', 'O stand apresentou uma ótima organização e chamou bastante atenção dos visitantes.'),
('2023-05-11', 3, NULL, 4.2, 5, 'Expositor', 'Gostei bastante da criatividade utilizada no design do stand.'),
('2023-05-12', 4, NULL, 5.0, 6, 'Organizador', 'Excelente interação com o público e ótima apresentação visual.'),
('2023-05-12', 5, NULL, 3.9, 7, 'Visitante', 'O conteúdo era interessante, mas poderia ter mais atividades interativas.'),
('2023-05-13', 6, NULL, 4.5, 8, 'Expositor', 'Muito bem estruturado e com uma equipe bastante receptiva.'),
('2023-05-13', 7, NULL, 4.7, 9, 'Organizador', 'O stand conseguiu atrair bastante visitantes durante o evento.'),
('2023-05-14', 8, NULL, 4.1, 10, 'Visitante', 'Achei a experiência muito divertida e diferente dos outros stands.'),
-- Comentários de EVENTOS (StandsID = NULL)
('2023-05-14', NULL, 3, 5.0, 11, 'Expositor', 'Um dos melhores eventos em questão de inovação e criatividade.'),
('2023-05-15', NULL, 4, 4.3, 12, 'Visitante', 'Boa apresentação e ótima comunicação da equipe responsável.'),
('2023-05-15', NULL, 5, 4.9, 13, 'Organizador', 'Evento extremamente tecnológico e muito elogiado pelos participantes.');

SELECT * FROM Comments;