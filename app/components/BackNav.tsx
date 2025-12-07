'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BackNav(){
    const parentPath = usePathname().split('/')[1];
    return(
        <>
            <nav className="back-nav">
                <Link className="back-nav-button" href={'/' + parentPath}>
                    <img src="back-arrow.svg" alt="An arrow pointing to the left." />
                </Link>
                <p>Back to <span className="capitalize">{parentPath}</span></p>
            </nav>
            <div className='divider-standard'></div>
        </>
    );
}