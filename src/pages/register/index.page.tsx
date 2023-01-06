import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { NextSeo } from "next-seo";
import { ArrowRight } from "phosphor-react";
import { useRegisterForm } from "./hooks/useRegisterForm";

import { Container, Form, FormError, Header } from "./styles";

export default function Register() {
  const { errors, handleRegister, handleSubmit, isSubmitting, register } =
    useRegisterForm();

  return (
    <>
      <NextSeo title="Crie uma conta | Call" />

      <Container>
        <Header>
          <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>

          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>

          <MultiStep size={4} currentStep={1} />
        </Header>

        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm">Nome do usuário</Text>
            <TextInput
              prefix="ignite.com/"
              placeholder="seu-usuario"
              {...register("username")}
            />
            {!!errors.username && (
              <FormError size="sm">{errors.username.message}</FormError>
            )}
          </label>

          <label>
            <Text size="sm">Nome completo</Text>
            <TextInput placeholder="Seu nome" {...register("name")} />

            {!!errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Próximo passo
            <ArrowRight />
          </Button>
        </Form>
      </Container>
    </>
  );
}
