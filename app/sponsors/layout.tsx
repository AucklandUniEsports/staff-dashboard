import { headers } from "next/headers";
import PageHeading from "../components/PageHeading";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SponsorsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({headers: await headers()});
  const user = session?.user;
  if (!user){
    redirect('/')
  }
  return (
    <>
        <PageHeading page="sponsors" />
        {children}
    </>
  );
}
