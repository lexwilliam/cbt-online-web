const bcrypt = require("bcryptjs");

if (process.argv.length !== 3) {
  console.error("Usage: node generate-password-hash.js <password>");
  process.exit(1);
}

const password = process.argv[2];

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

hashPassword(password)
  .then((hash) => {
    console.log("\nPassword Hash:", hash);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
