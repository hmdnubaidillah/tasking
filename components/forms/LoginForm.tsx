"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useLogin } from "@/hooks/user";
import { ErrorResponse, LoginFormType } from "@/types";
import { loginSchema } from "@/libs/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { mutate, isPending, isSuccess, error } = useLogin();
  const [passVisible, setPassVisible] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<LoginFormType>({
    criteriaMode: "all",
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormType> = (formData) => {
    mutate(formData);
  };

  const err = (error?.response?.data as ErrorResponse)?.error;

  useEffect(() => {
    if (err === "username or email not found") {
      setError("usernameOrEmail", {
        message: err,
      });
    }

    if (err === "password incorrect") {
      setError("password", {
        message: err,
      });
    }
  }, [err, setError]);

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  }, [isSuccess, router]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Controller
          name="usernameOrEmail"
          control={control}
          render={() => (
            <Input placeholder="email or username" type="text" className="text-base" {...register("usernameOrEmail")} />
          )}
        />

        {/* handling errors username/email */}
        {errors && <p className="text-red-600 text-base">{errors.usernameOrEmail?.message}</p>}

        <Controller
          name="password"
          control={control}
          render={() => (
            <>
              <Input
                placeholder="password"
                type={passVisible ? "text" : "password"}
                className="text-base"
                {...register("password", {
                  required: "password required",
                  minLength: { value: 8, message: "min password length is 8" },
                })}
              />
              {/* see password button */}
              <div className="flex items-center gap-2">
                <Input type="checkbox" className="w-[14px] h-[14px]" onClick={() => setPassVisible((prev) => !prev)} />
                <p className="text-gray-500 text-sm">see password</p>
              </div>
            </>
          )}
        />

        {/* handling errors password */}
        {errors && <p className="text-red-600 text-base">{errors.password?.message}</p>}

        <Button type="submit" disabled={isPending ? true : false} className="text-lg">
          {isPending ? <i className="uil uil-spinner animate-spin text-2xl" /> : "Login"}
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
