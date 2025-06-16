import { fastify } from "fastify";
import { criarUsuario, getUserByEmail, fetchRooms } from "./db.js";
import cors from "@fastify/cors";
import { criptografar, descriptografar } from "./utils/crypto.js";

const server = fastify();

server.register(cors, {
  origin: "*",
  methods: ["GET", "POST"],
});

server.post("/create-user", async (request, reply) => {
  const { nome, sobrenome, email, senha } = request.body;
  const user = await getUserByEmail(email);

  if (user) {
    return reply.code(409).send();
  }

  const { iv, encryptedData } = criptografar(senha);

  const createdUser = await criarUsuario({
    nome,
    sobrenome,
    email,
    senha: encryptedData,
    senhaIv: iv
  });

  return reply.code(201).send(createdUser);
});

server.post("/login", async (request, reply) => {
  const { email, senha } = request.body;
  const registerUser = await getUserByEmail(email);

  if (!registerUser) {
    return reply.code(404).send();
  }

  const cryptoPassword = descriptografar({
    encryptedData: registerUser.senha,
    iv: registerUser.senha_iv
  })

  if (cryptoPassword === senha) {
    return reply.code(200).send({
      nome: registerUser.nome,
      sobrenome: registerUser.sobrenome,
      email: registerUser.email,
    });
  }
 

  return reply.code(401).send();
});

server.get("/rooms", async (request, reply) => {
  const rooms = await fetchRooms();
  return reply.code(201).send(rooms);
});

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
