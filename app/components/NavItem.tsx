import Link from "next/link";

interface PageHeadingProps{
    page:string;
}

export default function NavItem({page}: PageHeadingProps){
    return(
        <Link href={page}>
            <li className="nav-item">
                <header className="nav-item-heading">
                    <img className="page-heading-icon" src={page + ".svg"} alt="" />
                    <h1 className="page-heading-title">{page}</h1>
                </header>
                <div className='divider-standard'></div>
            </li>
        </Link>
    );
}