"use server"

import { lucia, validateRequest } from "@/auth"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout(): Promise<void> {
    const {session} = await validateRequest();

    if (!session) {
        throw new Error("Unautorized");
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    // @ts-expect-error: VSCode false positive on cookies()
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )

    return redirect("/login")
}