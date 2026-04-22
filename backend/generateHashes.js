import bcrypt from "bcrypt";

async function generateHashes() {
  const password1 = "admin123";
  const password2 = "user123";

  const hash1 = await bcrypt.hash(password1, 10);
  const hash2 = await bcrypt.hash(password2, 10);

  console.log("Admin (admin123) hash:", hash1);
  console.log("User (user123) hash:", hash2);
  console.log("\nUpdate authController.js with these hashes:");
  console.log(`
  {
    id: 1,
    email: "admin@example.com",
    password: "${hash1}",
    role: "admin",
    name: "John Smith",
  },
  {
    id: 2,
    email: "user@example.com",
    password: "${hash2}",
    role: "employee",
    name: "Jane Doe",
  },
  `);
}

generateHashes().catch(console.error);
