import { sql } from "../db.js"

async function createRoom() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS rooms (
        roomId SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      );
    `
    console.log("✅ Tabela 'rooms' criada com sucesso.")
  } catch (error) {
    console.error("❌ Erro ao criar tabela:", error)
  }
}

createRoom()

