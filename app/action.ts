"use server";

import { cookies } from "next/headers";

export async function logout() {
  const isToken = cookies().has("token");

  if (isToken) {
    cookies().delete("token");
  }
}
