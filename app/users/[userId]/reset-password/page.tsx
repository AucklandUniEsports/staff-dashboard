"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackNav from "@/app/components/BackNav";
import StandardButton from "@/app/components/StandardButton";
import { authClient } from "@/lib/auth-client";

export default function ResetPassword({ params }: { params: { userId: string} }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await authClient.admin.setUserPassword({
      newPassword: formData.get("password") as string,
      userId: params.userId,
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
              <input name="password" className="input-field" minLength={8} placeholder="Password" required type="password"/>
              <StandardButton title="Reset Password." type="submit" color="grey"/>
            </form>
            {error && <p>{error}</p>}
        </section>
  );
}
