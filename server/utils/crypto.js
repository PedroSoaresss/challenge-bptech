import crypto from 'crypto';

const DADOS_CRIPTOGRAFAR = {
    algoritmo : "aes256",
    segredo : "chaves"
};

const key = crypto.scryptSync(DADOS_CRIPTOGRAFAR.segredo, 'salt', 32);

export function criptografar(texto) {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(DADOS_CRIPTOGRAFAR.algoritmo, key, iv);

    let encrypted = cipher.update(texto, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
        iv: iv.toString('hex'), 
        encryptedData: encrypted
    };
}

export function descriptografar(encryptedObject) {
    const iv = Buffer.from(encryptedObject.iv, 'hex');

    const decipher = crypto.createDecipheriv(DADOS_CRIPTOGRAFAR.algoritmo, key, iv);

    let decrypted = decipher.update(encryptedObject.encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}