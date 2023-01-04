import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../../lib/axios";

const updateProfileData = z.object({
  bio: z.string(),
});

type UpdateProfileData = z.infer<typeof updateProfileData>;

export function useUpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileData),
  });

  const session = useSession();
  const router = useRouter();

  async function handleUpdateProfile(data: UpdateProfileData) {
    api.put("/users/profile", {
      bio: data.bio,
    });

    await router.push(`/schedule/${session.data?.user.username}`);
  }

  return {
    register,
    handleSubmit,
    handleUpdateProfile,
    session,
    isSubmitting,
  };
}
