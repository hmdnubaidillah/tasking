"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { registerSchema } from "@/lib/lib.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import { RegisterFormType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function RegisterForm() {
  const { data, mutate, error, isPending, isError, isSuccess } = useMutation({
    mutationFn: (formData: RegisterFormType) => axios.post("/api/user/register", formData),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormType>({
    criteriaMode: "all",
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormType> = async (formInput) => {
    mutate(formInput);
  };

  if (isSuccess) {
    console.log(data);
  }

  if (isError) {
    console.log(error.message);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Input placeholder="email" type="email" className="text-base" {...register("email")} />

        {/* handling errors email */}
        {errors && <p className="text-red-600 text-base">{errors.email?.message}</p>}

        <Input placeholder="username" type="text" className="text-base" {...register("username")} />

        {/* handling errors username */}
        {errors && <p className="text-red-600 text-base">{errors.username?.message}</p>}

        <Input placeholder="password" type="password" className="text-base" {...register("password")} />

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

        <Input placeholder="repeat password" type="password" className="text-base" {...register("passwordRepeat")} />
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
