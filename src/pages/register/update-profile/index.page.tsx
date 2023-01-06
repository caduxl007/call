import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from "@ignite-ui/react";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { NextSeo } from "next-seo";
import { ArrowRight } from "phosphor-react";
import { builderNextAuthOptions } from "../../api/auth/[...nextauth].api";

import { Container, Header } from "../styles";
import { useUpdateProfile } from "./hooks/useUpdateProfile";
import { FormAnnotation, ProfileBox } from "./styles";

export default function UpdateProfile() {
  const { handleSubmit, handleUpdateProfile, register, isSubmitting, session } =
    useUpdateProfile();

  return (
    <>
      <NextSeo title="Atualize seu perfil | Call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Quase lá</Heading>

          <Text>
            Defina o intervalo de horários que você está disponível em cada dia
            da semana.
          </Text>

          <MultiStep size={4} currentStep={4} />
        </Header>

        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text>Foto de perfil</Text>
            <Avatar
              src={session.data?.user.avatar_url}
              referrerPolicy="no-referrer"
              alt={session.data?.user.name}
            />
          </label>

          <label>
            <Text size="sm">Sobre você</Text>
            <TextArea {...register("bio")} />
            <FormAnnotation size="sm">
              Fale um pouco sobre você. Isto será exibido em sua página pessoal.
            </FormAnnotation>
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Finalizar
            <ArrowRight />
          </Button>
        </ProfileBox>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(
    req,
    res,
    builderNextAuthOptions(req, res)
  );

  return {
    props: {
      session,
    },
  };
};
