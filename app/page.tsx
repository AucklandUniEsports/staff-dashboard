"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import StandardButton from "./components/StandardButton";
import { authClient } from "@/lib/auth-client";

export default function Landing() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setError(null);

      const formData = new FormData(e.currentTarget);

      const res = await authClient.signIn.email({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });

      if (res.error) {
        setError(res.error.message || "Something went wrong.");
      } else {
        router.push("/dashboard");
      }
    }

  return (
      <form className="landing" onSubmit={handleSubmit}>
        <section className="content-block">
          <label className="input-label" htmlFor="">Email Address</label>
          <input className="input-field" name="email" placeholder="myhouse@auec.club" required type="email"/>
          <label className="input-label" htmlFor="">Password</label>
          <input className="input-field" name="password" placeholder="Password123" required type="password"/>
        </section>
        <StandardButton title="Sign In." color="lime" type="submit" isLink={false}/>
        {error && <p>{error}</p>}
      </form>

  );
}
