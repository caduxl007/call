import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../../lib/axios";
import { convertTimeStringToMinutes } from "../../../../utils/convert-time-to-minutes";

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: "Você precisa selecionar pelo menos um dia da semana!",
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        };
      });
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes
        );
      },
      {
        message:
          "O horário de término deve ser pelo menos 1hr de distância do início",
      }
    ),
});

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>;
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>;

export function useRegisterTimerIntervals() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        {
          weekDay: 0,
          enabled: false,
          startTime: "08:00",
          endTime: "18:00",
        },
        {
          weekDay: 1,
          enabled: true,
          startTime: "08:00",
          endTime: "18:00",
        },
        {
          weekDay: 2,
          enabled: true,
          startTime: "08:00",
          endTime: "18:00",
        },
        {
          weekDay: 3,
          enabled: true,
          startTime: "08:00",
          endTime: "18:00",
        },
        {
          weekDay: 4,
          enabled: true,
          startTime: "08:00",
          endTime: "18:00",
        },
        {
          weekDay: 5,
          enabled: true,
          startTime: "08:00",
          endTime: "18:00",
        },
        {
          weekDay: 6,
          enabled: false,
          startTime: "08:00",
          endTime: "18:00",
        },
      ],
    },
  });

  const router = useRouter();

  const { fields } = useFieldArray({
    control,
    name: "intervals",
  });

  const intervals = watch("intervals");

  async function handleSetTimeIntervals(data: any) {
    const formData = data as TimeIntervalsFormOutput;

    await api.post("/users/time-intervals", formData);

    await router.push("/register/update-profile");
  }

  return {
    fields,
    intervals,
    control,
    errors,
    isSubmitting,
    register,
    handleSubmit,
    handleSetTimeIntervals,
  };
}
