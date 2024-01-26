"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { registerSchema } from "@/helpers/helper.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormType } from "@/types";

export default function RegisterForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormType>({
    criteriaMode: "all",
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormType> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input placeholder="email" type="email" className="text-base" {...field} />}
        />
        {/* handling errors email */}
        {errors && <p className="text-red-600 text-base">{errors.email?.message}</p>}

        <Controller
          name="username"
          control={control}
          render={({ field }) => <Input placeholder="username" type="text" className="text-base" {...field} />}
        />

        {/* handling errors username */}
        {errors && <p className="text-red-600 text-base">{errors.username?.message}</p>}
        {/* {errors && (
          <ul className="text-sm list-disc px-4">
            <li className={`${errors.username?.message !== "minimum length 4" ? "text-red-600" : "text-textPrimary"} `}>
              Minimum username length is 4
            </li>
          </ul>
        )} */}

        <Controller
          name="password"
          control={control}
          render={({ field }) => <Input placeholder="password" type="password" className="text-base" {...field} />}
        />

        {/* handling errors password */}

        {errors && <p className="text-red-600 text-base">{errors.password?.message}</p>}
        {/* {errors && (
          <ul className="text-sm list-disc px-4">
            <li className={`${errors.password?.message !== "minimum 8 chars" ? "text-red-600" : "text-textPrimary"}`}>
              Minimum password length is 8 characters
            </li>
            <li className={`${errors.password?.message !== "1 lowercase char" ? "text-red-600" : "text-textPrimary"}`}>
              Password must have 1 lowercase character
            </li>
            <li className={`${errors.password?.message !== "1 uppercase char" ? "text-red-600" : "text-textPrimary"}`}>
              Password must have 1 uppercase character
            </li>
          </ul>
        )} */}

        <Controller
          name="passwordRepeat"
          control={control}
          render={({ field }) => <Input placeholder="repeat password" type="text" className="text-base" {...field} />}
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
