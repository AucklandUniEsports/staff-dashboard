'use client';

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import StandardButton from "@/app/components/StandardButton";
import BackNav from "@/app/components/BackNav";
import { User } from "@/app/generated/prisma/client";

export default function UserPageClient({ user }: {user:User}) {
  const router = useRouter();

  async function deleteUser() {
    await authClient.admin.removeUser({ userId: user.id });
    router.push("/users");
  }

  if (!user) return <p>User not found!</p>;

  return (
    <section className="content-block">
      <BackNav/>
      <p className="user-name">{user.name}</p>
      <p className="user-email">{user.email}</p>

      <div className="user-info">
        <p>Role: {user.role}</p>
      </div>

      <div className="user-buttons">
        <StandardButton title="Edit User." color="grey" isLink={false}/>
        <StandardButton title="Reset Password." color="grey" isLink={false}/>
        <StandardButton onClick={deleteUser} title="Delete User." color="red" isLink={false}/>
      </div>
    </section>
  );
}
