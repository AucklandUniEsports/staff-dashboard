import PageHeading from "../components/PageHeading";

export default function SponsorsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <PageHeading page="Sponsors" />
        {children}
    </>
  );
}
