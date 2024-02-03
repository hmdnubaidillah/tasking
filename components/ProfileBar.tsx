"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { logout } from "@/app/action";

export default function ProfileBar({ token }: { token: boolean | undefined }) {
  const route = useRouter();

  return (
    <div className="bg-white h-fit border border-gray-300 rounded-sm cursor-default">
      {!token ? null : (
        //  user profile
        <div className="flex items-center gap-2 p-4 border-b border-gray-300">
          <div className="w-[50px] h-[50px] bg-purple-500 rounded-full grid place-content-center text-xl font-semibold text-white">
            U
          </div>
          <div>
            <h1 className="text-base font-medium leading-tight hover:underline">User145</h1>
            <h1 className="text-sm font-normal text-gray-400">user145@gmail.com</h1>
          </div>
        </div>
      )}

      {/* button */}
      <div className="p-4">
        {!token ? (
          <Button
            onClick={() => route.push("/login")}
            className="sm:text-lg text-base w-full bg-green-500 hover:bg-green-400"
            type="button"
          >
            Sign in
          </Button>
        ) : (
          <Button
            onClick={() => {
              const isConfirm = confirm("sure wanna logout?");

              if (!isConfirm) {
                return;
              }

              logout();
              route.push("/login");
            }}
            className="sm:text-lg text-base w-full bg-red-500 hover:bg-red-400"
            type="button"
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
}
