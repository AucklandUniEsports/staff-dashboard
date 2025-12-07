'use client';

import { useSession, signOut } from "@/lib/auth-client";
import { useEffect, useState } from 'react';
import { Sling as Hamburger } from 'hamburger-react'
import StandardButton from './StandardButton';
import NavItem from './NavItem';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar(){
    const { data: session, isPending } = useSession();
    const pathname = usePathname();
    const noNavRoutes = ['/'];
    const showNavbar = !noNavRoutes.includes(pathname);
    const pages = ["dashboard", "users", "events", "sponsors", "miscellaneous", "settings"];
    const [isOpen, setOpen] = useState(false)
    useEffect(() => {
        setOpen(false);
    },[pathname])
    return(
        showNavbar && (
            <>
                <div className='top-layer'>
                    <header className='navbar'>
                        <Hamburger size={28} toggled={isOpen} toggle={setOpen} />
                        {session && 
                        <p className='navbar-greeting'>Good morning, {session.user.name.split(' ')[0]}.</p> 
                        }
                    </header>
                    {isOpen && (
                        <nav className='navbar-open'>
                                <ul className='navbar-menu'>
                                    {
                                        pages.map(page =>
                                                <NavItem key={page} page={page}/>
                                        )
                                    }
                                </ul>
                            <StandardButton onClick={() => signOut()} title="Sign Out." color="red" isLink={false}/>
                        </nav>
                    )}
                </div>
                <div className='navbar-ghost'></div>
            </>
        )
    );
}