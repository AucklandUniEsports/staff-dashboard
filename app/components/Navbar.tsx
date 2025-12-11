'use client';

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from 'react';
import { Sling as Hamburger } from 'hamburger-react'
import StandardButton from './StandardButton';
import NavItem from './NavItem';
import { useRouter, usePathname } from 'next/navigation';
import { signOutAction } from "../actions/auth";

const pages = ["dashboard", "users", "events", "sponsors", "miscellaneous", "settings"];
const noNavRoutes = new Set(['/']);

export default function Navbar(){
    const pathname = usePathname();
    const showNavbar = !noNavRoutes.has(pathname);
    if (!showNavbar) return null;
    const { data: session, isPending } = authClient.useSession();
    const [isOpen, setOpen] = useState(false)
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);
    return(
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
                                        <NavItem key={page} onClick={() => setOpen(false)} page={page}/>
                                    )
                                }
                            </ul>
                        <StandardButton onClick={signOutAction} title="Sign Out." color="red"/>
                    </nav>
                )}
            </div>
            <div className='navbar-ghost'></div>
        </>
    );
}