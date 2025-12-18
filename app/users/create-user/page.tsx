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
      router.push("/users");
    }
  }

  return (
        <section className="content-block">
            <BackNav/>
            <form onSubmit={handleSubmit}>
              <label className="input-label" htmlFor="">Name</label>
              <input name="name" className="input-field" placeholder="First Last" required type="text"/>
              <label className="input-label" htmlFor="">Email</label>
              <input name="email" className="input-field" placeholder="feinfeinfein@gmail.com" required type="email"/>
              <label className="input-label" htmlFor="">Password</label>
              <input name="password" className="input-field" minLength={8} placeholder="Password123" required type="password"/>
              <StandardButton title="Create User." type="submit" color="grey"/>
            </form>
            {error && <p>{error}</p>}
        </section>
  );
}
