import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import WelcomeEmail from "@/email/WelcomeEmail";

interface SendWelcomeEmailData {
  to: string;
  name: string;
  setupUrl: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendWelcomeEmail({
  to,
  name,
  setupUrl,
}: SendWelcomeEmailData) {
  try {
    const emailHtml = await render(WelcomeEmail({ name, setupUrl }));

    const emailText = await render(WelcomeEmail({ name, setupUrl }), {
      plainText: true,
    });

    const mailOptions = {
      from: process.env.FROM_EMAIL || "noreply@mercado.com",
      to,
      subject: "Bem-vindo ao Sistema - Configure sua Senha",
      html: emailHtml,
      text: emailText,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email enviado:", result.messageId);

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    throw new Error("Falha ao enviar email");
  }
}

export async function testEmailConnection() {
  try {
    await transporter.verify();
    console.log("Conexão SMTP verificada com sucesso");
    return true;
  } catch (error) {
    console.error("Erro na conexão SMTP:", error);
    return false;
  }
}
