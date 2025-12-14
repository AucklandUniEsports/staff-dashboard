import EditUserClient from "./EditUserClient";

export default async function EditUser({params}:{params: Promise <{userId: string}>}){
    const { userId } = await params;
    return(
        <EditUserClient userId={userId}/>
    );
}