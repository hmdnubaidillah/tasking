"use server";

import { jwtDecode } from "@/libs/lib.jwt";
import { cookies } from "next/headers";

export async function isCookieExist() {
  return cookies().has("token");
}

export async function logout() {
  const cookie = await isCookieExist();

  if (cookie) {
    cookies().delete("token");
  }
}

export async function getUserId() {
  const token = cookies().get("token")?.value;
  const id = await jwtDecode(token);
  return id;
}
