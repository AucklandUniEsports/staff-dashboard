import Image from "next/image";

interface PageHeadingProps{
    title:string;
}

export default function PageHeading({title}: PageHeadingProps){
    return(
        <header className="page-heading">
            <img className="page-heading-icon" src="users.svg" alt="" />
            <h1 className="page-heading-title">{title}</h1>
        </header>
    );
}