'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import logoLG from '../../../public/logoLG.png'

type Props = {}

const Footer = (props: Props) => {
    const pathName = usePathname();
    if (pathName !== "/login") {
        return (
            <footer className="footer footer-center bg-slate-200 text-base-content rounded mt-auto text-xl">
                <div className='flex flex-col md:flex-row justify-center items-center text-center'>
                    <p>Sviluppato da <a className='link' href="https://www.linkedin.com/in/dennisbadagliacca/" target="_blank" rel="noreferrer">Dennis Badagliacca</a></p>
                    per <a href="https://licenseglobal.it" target="_blank" rel="noreferrer">
                        <Image width={160} src={logoLG} alt='logo' />
                    </a>
                </div>
            </footer>
        )
    }
    return null;
}

export default Footer