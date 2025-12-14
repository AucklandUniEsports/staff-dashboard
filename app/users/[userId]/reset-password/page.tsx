import ResetPasswordClient from "./ResetPasswordClient";

export default async function ResetPassword({params}:{params: Promise <{userId: string}>}) {
   const { userId } = await params;
  return (
    <ResetPasswordClient userId={userId}/>
  );
}
