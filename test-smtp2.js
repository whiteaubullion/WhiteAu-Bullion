const nodemailer = require('nodemailer');

const password = process.argv[2];

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // false for 587
  auth: {
    user: "whiteau.bullion@gmail.com",
    pass: password.replace(/\s+/g, ''),
  },
});

async function main() {
  console.log("Testing connection to Gmail SMTP on Port 587...");
  try {
    await transporter.verify();
    console.log("✅ SUCCESS! Your Gmail App Password is correct and SMTP is working on Port 587.");
  } catch (error) {
    console.error("❌ FAILED! Gmail rejected the connection. See error below:");
    console.error(error.message);
  }
}

main();
