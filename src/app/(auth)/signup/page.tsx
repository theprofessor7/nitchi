import { Metadata } from "next";
import signupImage from "@/assets/signup-image2.jpg";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
    title: "Sign Up"
}

export default function Page() {
    return (
        <main className="flex min-h-screen items-center justify-center p-5">
            <div className="flex h-full max-h-[90vh] w-full max-w-4xl rounded-2xl overflow-hidden bg-card shadow-2xl">
                <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
                    <div className="space-y-1 text-center">
                        <h1 className="text-3xl font-bold">Sign up to Nitchi</h1>
                        <p className="text-muted-foreground">
                            Create · Share · Shine with <span className="italic">powerful</span> notes.<br/>
                            No Ads, no tracking
                        </p>
                    </div>
                    <div className="space-y-5">
                        <SignUpForm />
                        <Link href="/login" className="block text-center hover:underline">
                            Already have an account? Log in
                        </Link>
                    </div>
                </div>
            <Image src={signupImage} alt="" className="w-1/2 hidden md:block object-cover" /> 
            </div>
        </main>
    );
}