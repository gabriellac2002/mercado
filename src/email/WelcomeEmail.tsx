import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Heading,
  Hr,
} from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
  setupUrl: string;
}

export default function WelcomeEmail({ name, setupUrl }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Heading style={heading}>Bem-vindo ao Sistema!</Heading>
            
            <Text style={text}>
              Olá, <strong>{name}</strong>!
            </Text>
            
            <Text style={text}>
              Você foi convidado para fazer parte do nosso sistema.
            </Text>
            
            <Text style={text}>
              Para começar a usar sua conta, você precisa definir sua senha clicando no botão abaixo:
            </Text>
            
            <Section style={buttonContainer}>
              <Button style={button} href={setupUrl}>
                Definir Senha
              </Button>
            </Section>
            
            <Text style={warning}>
              <strong>Este link expira em 24 horas.</strong>
            </Text>
            
            <Hr style={hr} />
            
            <Text style={footer}>
              Se você não conseguir clicar no botão, copie e cole o link abaixo no seu navegador:
            </Text>
            
            <Text style={link}>{setupUrl}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Estilos
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const section = {
  padding: "0 48px",
};

const heading = {
  fontSize: "28px",
  fontWeight: "600",
  color: "#1f2937",
  textAlign: "center" as const,
  marginBottom: "32px",
};

const text = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#374151",
  marginBottom: "16px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#007bff",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const warning = {
  fontSize: "14px",
  color: "#dc2626",
  textAlign: "center" as const,
  fontWeight: "600",
  marginBottom: "24px",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 0",
};

const footer = {
  fontSize: "14px",
  color: "#6b7280",
  marginBottom: "8px",
};

const link = {
  fontSize: "14px",
  color: "#007bff",
  wordBreak: "break-all" as const,
};
