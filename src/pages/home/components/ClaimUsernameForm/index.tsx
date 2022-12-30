import { Button, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useClaimUsernameForm } from './hooks/useClaimUsernameForm'
import { Form, FormAnnotation } from './styles'

export function ClaimUsernameForm() {
  const { errors, handleClaimUsername, handleSubmit, isSubmitting, register } =
    useClaimUsernameForm()

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuario"
          {...register('username')}
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Digite o nome do usuário desejado'}
        </Text>
      </FormAnnotation>
    </>
  )
}
