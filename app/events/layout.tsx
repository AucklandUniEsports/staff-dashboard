import PageHeading from "../components/PageHeading";

export default function EventsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <PageHeading page="events" />
        {children}
    </>
  );
}
