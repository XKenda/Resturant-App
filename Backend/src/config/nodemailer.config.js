import { createTransport } from "nodemailer";
import { SMTP_PASS, SMTP_USER } from "./env.js";

console.log("USER:", SMTP_USER);
console.log("PASS EXISTS:", !!SMTP_PASS);

const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
    }
})

export default transport;