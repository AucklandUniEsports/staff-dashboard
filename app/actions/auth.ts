"use server";
import { headers } from "next/headers";
import { redirect } from 'next/navigation';
import { auth } from '../../lib/auth'


export async function signUpAction(formData: FormData) {
    const email = (formData.get("email") as string).trim();
    const password = (formData.get("password") as string).trim();
    const name = (formData.get("name") as string).trim();
    await auth.api.signUpEmail({
        body: {
            name: name,
            email: email,
            password: password,
        },
    });
    redirect("/dashboard");
}

export async function signInAction(formData: FormData) {
    const email = (formData.get("email") as string).trim();
    const password = (formData.get("password") as string).trim();
    await auth.api.signInEmail({
        body: {
            email: email,
            password: password,
        },
    });
    redirect("/dashboard");
}

export async function signOutAction() {
    await auth.api.signOut({
        headers: await headers(),
    })
    redirect("/");
}