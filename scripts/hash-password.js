const bcrypt = require('bcryptjs');

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/hash-password.js <password>');
  process.exit(1);
}

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log('\nBcrypt hash generated successfully:');
console.log(hash);
console.log('\nAdd this to your .env.local file:');
console.log(`ADMIN_PASSWORD="${hash}"`);
