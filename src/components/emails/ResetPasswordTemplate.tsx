import { Html, Body, Container, Text, Button, Preview, Head } from "@react-email/components";
import * as React from "react";

export const ResetPasswordEmail = ({ resetLink }: { resetLink: string }) => (
  <Html>
    <Head />
    <Preview>Recupera tu acceso a NUTRIAS</Preview>
    <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f6f9fc', padding: '20px' }}>
      <Container style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '8px' }}>
        <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#22c55e' }}>NUTRIAS</Text>
        <Text>Hola, recibimos una solicitud para restablecer tu contraseña.</Text>
        <Button 
          href={resetLink}
          style={{ backgroundColor: '#22c55e', color: '#fff', padding: '12px 20px', borderRadius: '5px', textDecoration: 'none' }}
        >
          Restablecer Contraseña
        </Button>
        <Text style={{ fontSize: '12px', color: '#888', marginTop: '20px' }}>
          Si no solicitaste esto, ignora este correo.
        </Text>
      </Container>
    </Body>
  </Html>
);