import "dotenv/config";
import postgres from "postgres";

export const sql = postgres(process.env.DATABASE_URL, {
  ssl: true,
});

export async function criarUsuario({ nome, sobrenome, email, senha, senhaIv }) {
  try {
    const result = await sql`
        INSERT INTO usuarios (nome, sobrenome, email, senha, senha_iv)
        VALUES (${nome}, ${sobrenome}, ${email}, ${senha}, ${senhaIv})
        RETURNING nome, sobrenome, email, criado_em;
      `;
    return result[0];
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
}

async function getPgVersion() {
  try {
    const result = await sql`SELECT version()`;
    console.log(result);
  } catch (err) {
    console.error("Erro ao conectar no PostgreSQL:", err);
  }
}

export async function getUserByEmail(email) {
  try {
    const validation = await sql`
      SELECT * FROM usuarios WHERE email = ${email}
    `;
    return validation[0];
  } catch (error) {
    console.error("Erro ao buscar usuário por email:", error);
    throw error;
  }
}

export async function fetchRooms() {
  try {
    const result = await sql`
      SELECT * FROM rooms `;
    return result;
  } catch (error) {
    console.error("Erro ao buscar sala por nome:", error);
    throw error;
  }
}

getPgVersion();
