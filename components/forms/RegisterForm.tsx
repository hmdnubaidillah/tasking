"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { registerSchema } from "@/libs/lib.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import { RegisterFormType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export default function RegisterForm() {
  const { data, mutate, error, isPending, isError, isSuccess } = useMutation({
    mutationFn: (formData: RegisterFormType) => axios.post("/api/user/register", formData),
  });

  const {
    handleSubmit,
    register,
    trigger,
    control,
    formState: { errors },
  } = useForm<RegisterFormType>({
    criteriaMode: "all",
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormType> = async (formInput) => {
    mutate(formInput);
  };

  // if (isSuccess) {
  //   console.log(data);
  // }

  // if (isError) {
  //   console.log(error.message);
  // }

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <Input
              placeholder="email"
              type="email"
              className="text-base"
              {...register("email")}
              onChange={(e) => {
                onChange(e);
                trigger("email");
              }}
            />
          )}
        />

        {/* handling errors email */}
        {errors && <p className="text-red-600 text-base">{errors.email?.message}</p>}

        <Controller
          name="username"
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <Input
              placeholder="username"
              type="text"
              className="text-base"
              {...register("username")}
              onChange={(e) => {
                onChange(e);
                trigger("username");
              }}
            />
          )}
        />

        {/* handling errors username */}
        {errors && <p className="text-red-600 text-base">{errors.username?.message}</p>}

        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <Input
              placeholder="password"
              type="password"
              className="text-base"
              {...register("password")}
              onChange={(e) => {
                onChange(e);
                trigger("password");
              }}
            />
          )}
        />

        {/* handling errors password */}
        <ul className="list-disc px-4 text-sm text-red-600">
          <ErrorMessage
            name="password"
            errors={errors}
            render={(error) =>
              error.messages
                ? error.messages &&
                  Object.entries(error.messages).map(([type, message]) => <li key={type}>{message}</li>)
                : null
            }
          />
        </ul>

        <Controller
          name="passwordRepeat"
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <Input
              placeholder="passwordRepeat"
              type="password"
              className="text-base"
              {...register("passwordRepeat")}
              onChange={(e) => {
                onChange(e);
                trigger("passwordRepeat");
              }}
            />
          )}
        />
        {errors && <p className="text-red-600 text-base">{errors.passwordRepeat?.message}</p>}

        <Button type="submit" className="text-lg">
          {isPending ? "Loading" : "Register"}
        </Button>
      </form>
      <div className="mt-3 text-center">
        <span className="sm:text-base text-sm">
          Already have an account?{" "}
          <Link href={"/login"} className="hover:underline text-primaryBlue font-medium">
            login here
          </Link>
        </span>
      </div>
    </div>
  );
}
