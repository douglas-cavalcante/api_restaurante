-- Adiciona a coluna que guarda a chave (caminho) do comprovante no bucket S3.
-- Rode uma vez em bancos que ja existiam antes desta alteracao:
-- psql -U $DB_USER -d $DB_NAME < src/database/migrations/2026-09-30-add-comprovante-pedidos.sql
ALTER TABLE "pedidos" ADD COLUMN IF NOT EXISTS "comprovante_key" VARCHAR(255) NULL;
