import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { NextSeo } from "next-seo";
import { ArrowRight, Check } from "phosphor-react";

import { Container, Header } from "../styles";
import { useRegister } from "./hooks/useRegister";
import { ConnectBox, ConnectItem, AuthError } from "./styles";

export default function Register() {
  const {
    hasAuthError,
    isSignedIn,
    handleConnectCalendar,
    handleNavigateToNextStep,
  } = useRegister();

  return (
    <>
      <NextSeo title="Conecte sua agenda do Google | Call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Conecte sua agenda!</Heading>

          <Text>
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos à medida em que são agendados.
          </Text>

          <MultiStep size={4} currentStep={2} />
        </Header>

        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>

            {isSignedIn ? (
              <Button size="sm" disabled>
                Conectado
                <Check />
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleConnectCalendar}
              >
                Conectar
                <ArrowRight />
              </Button>
            )}
          </ConnectItem>

          {hasAuthError && (
            <AuthError size="sm">
              Falha ao se conectar ao Google, verifique se você habilitou as
              permissões de acesso ao Google Calendar.
            </AuthError>
          )}

          <Button
            onClick={handleNavigateToNextStep}
            type="submit"
            disabled={!isSignedIn}
          >
            Próximo passo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  );
}
