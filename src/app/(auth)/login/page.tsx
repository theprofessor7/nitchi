
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import loginImage from "@/assets/login-image2.jpg";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to Nitchi to create and share your notes",
};

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center p-5">
      <div className="flex w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-card shadow-2xl">
        {/* Left panel */}
        <div className="flex-1 space-y-8 overflow-y-auto p-8 md:w-1/2">
          <h1 className="text-center text-3xl font-bold">Login to Nitchi</h1>
          <LoginForm />
          <p className="text-center text-sm text-muted-foreground">
             Don’t have an account? <Link href="/signup" className="underline">Sign up</Link>
          </p>
        </div>
        {/* Right panel image */}
        <div className="hidden md:block md:w-1/2">
          <Image
            src={loginImage}
            alt="Illustration for login"
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </div>
    </main>
  );
}

