import { sql } from "../db.js";

async function addSenhaIvColumn() {
  try {
    await sql`
    ALTER TABLE usuarios
    ADD COLUMN senha_iv TEXT;
    `;
    console.log("✅ Coluna 'senha_iv' adicionada à tabela 'usuarios' com sucesso.");
  } catch (error) {
    console.error("❌ Erro ao adicionar coluna 'senha_iv':", error);
  }
}

addSenhaIvColumn();