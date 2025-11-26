'use client';

import { useState } from 'react';
import { Sling as Hamburger } from 'hamburger-react'
import StandardButton from './StandardButton';

export default function Navbar(){
    const [isOpen, setOpen] = useState(false)
    return(
        <div className='top-layer'>
            <header className='navbar'>
                <Hamburger size={28} toggled={isOpen} toggle={setOpen} />
                <p className='navbar-greeting'>Good morning, Name.</p>
            </header>
            {isOpen && (
                <div className='navbar-open'>
                    <StandardButton title="Sign Out." color="red"/>
                </div>
            )}
        </div>
    );
}