
INSERT INTO Stands (ID_Event, Name, Subtitle, Local, Description, Score, Image,  Genres, Format, ContentRating, Copyright, DaysID)
VALUES (
              1, 
              'TestesIrado', 
              "Melhor Stand de Todos",
              'Pavilhão A', 
              "Está cansado de testes repetitivos? Venha chorar comigo de noite sem ter comido ou dormido enquanto eu faço essa budega funcionar",  
              5.0, 
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYg-EG_6tLCVhoSAxwnx1FXP71yv4ByhfhnQ&s', 
              JSON_ARRAY('Tecnologia', 'Inovação', 'Negócios', 'Universitário'), 
              JSON_ARRAY('Presencial'), 
              '' , 
              '', 
              1
       ), 
       (
              1, 
              'Fanclube do Senhor do Fogo Zuko', 
              "De avatar",'Pavilhão B', 
              "Stand Oficial do senhor do fogo Zuko, amigo pessoal do Avatar Aang e sobrinho de Iroh", 
              5.0, 
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlPftJdx3wwe7Frmn4CtqlbdSwi3TFGL28lg&s', 
              JSON_ARRAY('Animação', 'Fantasia', 'Aventura'), 
              JSON_ARRAY('Presencial'), 
              '' , 
              '', 
              1
       ), 
       (
              1, 
              'Porquê o Robotinic odeia o Sonic', 
              "",
              'Pavilhão C', 
              "O que leva o Dr. Robotnik a odiar tanto o Sonic? Venha debater e desabafar suas teorias aqui!", 
              3.0, 
              'https://preview.redd.it/thoughts-on-a-sonic-game-where-sonic-and-eggman-work-v0-ewbkrqj4nqzd1.png?width=816&format=png&auto=webp&s=20d66ca0483ff9c210dea3d9594a8ba88c869a69', 
              JSON_ARRAY('Animação', 'Aventura', 'Jogos'), 
              JSON_ARRAY('Presencial'), 
              '' , 
              '', 
              1
       );


SELECT * FROM Stands;
 