"use server"

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { loginSchema, LoginValues } from "@/lib/validation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import {verify} from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
    credentials: LoginValues,
): Promise<{error?: string}> {
    try {
        const {username, password} = loginSchema.parse(credentials)

        const existingUser = await prisma.user.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        })

        if(!existingUser || !existingUser.passwordHash) {
            return {
                error: "Incorrect username or password"
            }
        }

        const validPassword = await verify(existingUser.passwordHash, password);

        if (!validPassword) {
            return {
                error: "Incorrect username or password"
            }
        }

        const session = await lucia.createSession(existingUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        // @ts-expect-error: VSCode false positive on cookies()
        cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
        );

    return redirect("/");

    } catch (error) {
        if (isRedirectError(error)) throw error;
        console.error(error);
        return {
            error: "Something went wrong. Please try again"
        }
    }
}