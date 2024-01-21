"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface UserRegister {
  username: string;
  password: string;
  passwordRepeat: string;
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserRegister>({
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<UserRegister> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Input
          placeholder="username"
          type="text"
          className="text-base"
          {...register("username", {
            required: "username required",
            minLength: { value: 6, message: "min username length is 6" },
          })}
        />
        {/* handling errors username */}
        {errors && <p className="text-red-600 text-base">{errors.username?.message}</p>}

        <Input
          placeholder="password"
          type="password"
          className="text-base"
          {...register("password", {
            required: "password required",
            minLength: { value: 8, message: "min password lenght is 8" },
          })}
        />

        {/* handling errors password */}
        {errors && <p className="text-red-600 text-base">{errors.password?.message}</p>}
        <Input
          placeholder="repeat password"
          type="password"
          className="text-base"
          {...register("passwordRepeat", {
            required: "please repeat password",
            validate: (val: string) => {
              if (watch("password") !== val) {
                return "your password do not match";
              }
            },
          })}
        />
        {errors && <p className="text-red-600 text-base">{errors.passwordRepeat?.message}</p>}

        <Button type="submit" className="text-lg">
          Submit
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
