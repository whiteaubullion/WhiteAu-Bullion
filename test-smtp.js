const nodemailer = require('nodemailer');

// To run this, type in your terminal:
// node test-smtp.js "your-16-char-app-password"

const password = process.argv[2];

if (!password) {
  console.error("Please provide your App Password as an argument!");
  console.error("Example: node test-smtp.js \"abcd efgh ijkl mnop\"");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "whiteau.bullion@gmail.com", // Your email
    pass: password.replace(/\s+/g, ''), // Removes spaces just in case
  },
});

async function main() {
  console.log("Testing connection to Gmail SMTP...");
  try {
    await transporter.verify();
    console.log("✅ SUCCESS! Your Gmail App Password is correct and SMTP is working.");
    console.log("If Supabase is still failing, make sure you clicked 'Save' in Supabase and toggled 'Enable Custom SMTP' to ON.");
  } catch (error) {
    console.error("❌ FAILED! Gmail rejected the connection. See error below:");
    console.error(error.message);
    if (error.message.includes('Username and Password not accepted')) {
      console.log("\n-> This means your App Password is wrong or was deleted.");
    }
  }
}

main();
