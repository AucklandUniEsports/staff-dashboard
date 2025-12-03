import PageHeading from "../components/PageHeading";

export default function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <PageHeading page="users" />
        {children}
    </>
  );
}
