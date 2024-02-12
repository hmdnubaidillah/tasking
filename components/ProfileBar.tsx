"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { logout } from "@/app/action";
import { useGetUser } from "@/hooks/user";
import SkeletonProfile from "./skeleton/SkeletonProfile";
import { isCookieExist } from "@/app/action";

export default function ProfileBar() {
  const route = useRouter();
  const { data, isPending } = useGetUser();

  return (
    <div className="bg-white h-fit border border-gray-300 rounded-sm cursor-default">
      {!isCookieExist ? null : isPending ? ( //  user profile
        <SkeletonProfile />
      ) : (
        <div className="flex flex-col gap-2 p-4 border-b border-gray-300">
          <h1 className="text-base font-medium hover:underline">{data?.data.user.username}</h1>
          <h1 className="text-sm font-normal text-gray-400">{data?.data.user.email}</h1>
        </div>
      )}

      {/* button */}
      <div className="p-4">
        {!isCookieExist ? (
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
