"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BackNav from "@/app/components/BackNav";
import StandardButton from "@/app/components/StandardButton";
import { authClient } from "@/lib/auth-client";

export default function EditUserClient({userId}:{userId:string}){
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    const res = await authClient.admin.updateUser({
        userId: userId,
        data: {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
        }
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/users");
    }
  }
  
  return (
        <section className="content-block">
            <BackNav/>
            <form onSubmit={handleSubmit}>
                <input name="name" className="input-field" placeholder="Name" required type="text"/>
                <input name="email" className="input-field" placeholder="Email" required type="email"/>
                <StandardButton title="Update Details." type="submit" color="grey"/>
            </form>
            {error && <p>{error}</p>}
        </section>
  );
}