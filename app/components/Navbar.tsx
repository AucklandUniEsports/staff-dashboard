'use client';

import { useEffect, useState } from 'react';
import { Sling as Hamburger } from 'hamburger-react'
import StandardButton from './StandardButton';
import NavItem from './NavItem';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar(){
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
                        <p className='navbar-greeting'>Good morning, Name.</p>
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
                            <StandardButton title="Sign Out." color="red" isLink={false}/>
                        </nav>
                    )}
                </div>
                <div className='navbar-ghost'></div>
            </>
        )
    );
}