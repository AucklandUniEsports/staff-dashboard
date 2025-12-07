"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackNav from "@/app/components/BackNav";
import StandardButton from "@/app/components/StandardButton";
import { authClient } from "@/lib/auth-client";

export default function CreateUser() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await authClient.admin.createUser({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      name: formData.get("name") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/dashboard");
    }
  }
  return (
        <section className="content-block">
            <BackNav/>
            <form onSubmit={handleSubmit}>
              <input name="name" className="input-field" placeholder="Name" required type="text"/>
              <input name="email" className="input-field" placeholder="Email" required type="email"/>
              <input name="password" className="input-field" minLength={8} placeholder="Password" required type="password"/>
              <StandardButton title="Create User." type="submit" color="grey" isLink={false}/>
            </form>
            {error && <p>{error}</p>}
        </section>
  );
}
