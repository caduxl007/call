import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/router'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Mínimo de 3 letras' })
    .regex(/^([a-z\\-]+)$/i, { message: 'Apenas letras e hifens' })
    .transform((value) => value.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function useClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    await router.push(`/register?username=${data.username}`)
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleClaimUsername,
  }
}
