import prisma from "@/lib/prisma";
import BackNav from "@/app/components/BackNav";
import StandardButton from "@/app/components/StandardButton";

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
          <BackNav/>
          {(data)?
          <>
            <p className="user-name">{data.name}</p>
            <p className="user-email">{data.email}</p>
            <div className="user-info">
              <p>Role: {data.role}</p>
            </div>
            <div className="user-buttons">
              <StandardButton title="Edit User." color="grey" isLink={false}/>
              <StandardButton title="Reset Password." color="grey" isLink={false}/>
              <StandardButton title="Delete User." color="red" isLink={false}/>
            </div>
          </>
          :
          <p className="user-name">User not found!</p>          
          }
        </section>
      </>
  );
}
