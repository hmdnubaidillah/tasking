"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { registerSchema } from "@/libs/lib.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import { ErrorResponse, RegisterFormType } from "@/types";
import { useEffect, useState } from "react";
import { useRegister } from "@/hooks/hook.user";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const { data, isError, mutate, error, isPending, isSuccess } = useRegister();
  const [passVisible, setPassVisible] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    trigger,
    control,
    setError,
    formState: { errors },
  } = useForm<RegisterFormType>({
    criteriaMode: "all",
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const onSubmit: SubmitHandler<RegisterFormType> = async (formInput) => {
    mutate(formInput);
  };

  const err = (error?.response?.data as ErrorResponse)?.error;

  useEffect(() => {
    if (err === "email already taken") {
      setError("email", {
        message: err,
      });
    }

    if (err === "username already taken") {
      setError("username", {
        message: err,
      });
    }
  }, [err, setError]);

  if (isSuccess) {
    router.push("/");
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange } }) => (
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
          render={({ field: { onChange } }) => (
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
          render={({ field: { onChange } }) => (
            <Input
              placeholder="password"
              type={passVisible ? "text" : "password"}
              className="text-base"
              {...register("password")}
              onChange={(e) => {
                onChange(e);
                trigger("password");
              }}
            />
          )}
        />
        {/* see password button */}
        <div className="flex items-center gap-2">
          <Input type="checkbox" className="w-[14px] h-[14px]" onClick={() => setPassVisible((prev) => !prev)} />
          <p className="text-gray-500 text-sm">see password</p>
        </div>

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
          render={({ field: { onChange } }) => (
            <Input
              placeholder="repeat password"
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

        <Button type="submit" disabled={isPending ? true : false} className="text-lg">
          {isPending ? <i className="uil uil-spinner animate-spin text-2xl" /> : "Register"}
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
