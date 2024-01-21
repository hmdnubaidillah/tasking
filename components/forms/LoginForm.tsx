"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface UserLogin {
  username: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<UserLogin> = (data) => {
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
            minLength: { value: 8, message: "min password length is 8" },
          })}
        />

        <Button type="submit" className="text-lg">
          Submit
        </Button>
      </form>
      <div className="mt-3 text-center">
        <span className="sm:text-base text-sm">
          Dont have an account?{" "}
          <Link href={"/register"} className="hover:underline text-primaryBlue font-medium">
            register here
          </Link>
        </span>
      </div>
    </div>
  );
}
