import prisma from "@/lib/prisma";

export default async function UserPage({params}:{params: Promise <{userId: string}>}) {
  const { userId } = await params;
  const data = await prisma.user.findUnique({
    where:{
      id: userId,
    }
  })
  return (
      <>
        <section className="content-block">
          <p>{data.name}</p>
        </section>
      </>
  );
}
