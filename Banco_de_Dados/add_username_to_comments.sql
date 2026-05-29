-- Migração: Adicionar coluna UserName à tabela Comments
-- Esta migração adiciona a coluna UserName para armazenar o nome do usuário que criou o comentário

ALTER TABLE Comments ADD COLUMN UserName VARCHAR(255) DEFAULT 'Anônimo' AFTER UserID;

-- Verificar a estrutura da tabela após a alteração
DESCRIBE Comments;
