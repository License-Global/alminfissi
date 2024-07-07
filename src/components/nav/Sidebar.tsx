'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Hero from '../Subnav/Hero'
import logo from '../../../public/logo.webp'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

type Props = {}

const Sidebar = (props: Props) => {
    const pathName = usePathname();
    const router = useRouter();
    const handleExit = () => {
        localStorage.removeItem('token');
        router.replace('/');
    }
    if (pathName !== "/login") {
        return (
            <div>
                <div className="drawer z-50">
                    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col">
                        {/* Navbar */}
                        <div className="w-full navbar bg-slate-200">
                            <div className="flex-none lg:hidden">
                                <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                </label>
                            </div>
                            <div className="flex-1 items-center">
                                <Link href={"/orders"} className="btn btn-ghost text-xl rounded-lg">Home <Image src={logo} alt='logo' width={80} /></Link>

                            </div>
                            {pathName === "/login" ? "" :
                                <div className="flex-none hidden lg:block">
                                    <ul className="menu menu-horizontal">
                                        {/* Navbar menu content here */}
                                        <li><p onClick={() => handleExit()}>Esci</p></li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                    {pathName === "/login" ? "" :
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-slate-200">
                                {/* Sidebar content here */}
                                <li><p className='link' onClick={() => handleExit()}>Esci</p></li>
                            </ul>
                        </div>
                    }
                </div>
                <Hero userType={"Admin"} />
            </div>

        )
    }
}

export default Sidebar