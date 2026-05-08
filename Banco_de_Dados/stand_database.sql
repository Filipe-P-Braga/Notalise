
INSERT INTO Stands (ID_Event, Name, Subtitle, Local, Description, Score, Image,  Genres, Format, ContentRating, Copyright, DaysID)
VALUES (1, 'TestesIrado', "Melhor Stand de Todos",'Pavilhão A', "Está cansado de testes repetitivos? Venha chorar comigo de noite sem ter comido ou dormido enquanto eu faço essa budega funcionar",  5.0, 'TestImage.jpg', JSON_ARRAY('Tecnologia', 'Inovação', 'Negócios', 'Universitário'), JSON_ARRAY('Presencial'), '' , '', 1), 
       (1, 'Fanclube do Senhor do Fogo Zuko', "De avatar",'Pavilhão B', "Stand Oficial do senhor do fogo Zuko, amigo pessoal do Avatar Aang e sobrinho de Iroh", 5.0, 'Zuko.jpg', JSON_ARRAY('Animação', 'Fantasia', 'Aventura'), JSON_ARRAY('Presencial'), '' , '', 1), 
       (1, 'Porquê o Robotinic odeia o Sonic', "",'Pavilhão C', "O que leva o Dr. Robotnik a odiar tanto o Sonic? Venha debater e desabafar suas teorias aqui!", 3.0, 'Robotnik.jpg', JSON_ARRAY('Animação', 'Aventura', 'Jogos'), JSON_ARRAY('Presencial'), '' , '', 1);


SELECT * FROM Stands;
 