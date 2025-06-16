import crypto from 'crypto';

const DADOS_CRIPTOGRAFAR = {
    algoritmo : "aes-256-cbc",
    segredo : "chaves"
};

const key = crypto.scryptSync(DADOS_CRIPTOGRAFAR.segredo, 'salt', 32);

export function criptografar(texto) {
    const iv = crypto.randomBytes(16);
    console.log(iv)

    const cipher = crypto.createCipheriv(DADOS_CRIPTOGRAFAR.algoritmo, key, iv);
    console.log(cipher)

    let encrypted = cipher.update(texto, 'utf8', 'hex');
    console.log(" balbalblabl")
    encrypted += cipher.final('hex');
    console.log(" turururururl")

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