"use server";

import { cookies } from "next/headers";

export async function getToken() {
  return (await cookies()).get("token")?.value;
}

export async function updateToken(token: string) {
  (await cookies()).set("token", token);
}
