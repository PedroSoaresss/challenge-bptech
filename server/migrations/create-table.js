import { sql } from "../db.js"

async function createTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        sobrenome VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        senha TEXT NOT NULL,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `
    console.log("✅ Tabela 'usuarios' criada com sucesso.")
  } catch (error) {
    console.error("❌ Erro ao criar tabela:", error)
  }
}

createTable()

