const crypto = require('crypto');
const fs = require('fs');
const { privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});
let env = fs.readFileSync('c:/xampp/htdocs/farmpedia/.env.local', 'utf8');
env = env.replace(/FIREBASE_PRIVATE_KEY=.*/, 'FIREBASE_PRIVATE_KEY="' + privateKey.replace(/\n/g, '\\n') + '"');
fs.writeFileSync('c:/xampp/htdocs/farmpedia/.env.local', env);
console.log("RSA Key injected");
