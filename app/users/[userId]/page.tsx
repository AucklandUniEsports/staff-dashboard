import prisma from "@/lib/prisma";
import UserPageClient from "./UserPageClient";


export default async function UserPage({params}:{params: Promise <{userId: string}>}) {
  const { userId } = await params;
  const data = await prisma.user.findUnique({
    where:{
      id: userId,
    }
  })
  if (!data){
    return (
      <div>not found!</div>
    )
  }
  return <UserPageClient user={data} />;
}