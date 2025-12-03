"use client"

import { betterAuth } from "better-auth";
import StandardButton from "./components/StandardButton";

export default function Landing() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string).trim();
    const password = (formData.get("password") as string).trim();
    console.log(email);
    console.log(password);

  }
  return (
      <form className="landing" onSubmit={handleSubmit}>
        <section className="content-block">
          <input className="input-field" name="email" placeholder="Username" type="email" required/>
          <input className="input-field" name="password" placeholder="Password" type="password" required/>
        </section>
        <StandardButton title="Sign In." color="lime" type="submit" isLink={false}/>
      </form>

  );
}
