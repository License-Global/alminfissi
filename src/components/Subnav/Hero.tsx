'use client'
import React, { useLayoutEffect, useState } from 'react'
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { isAuthenticated } from '@/utils/Auth/Auth';
import axios from 'axios';


type Props = {
    userType: any,
}

const Hero = (props: Props) => {
    const router = useRouter();
    const pathName = usePathname();

    const [isLoading, setIsLoading] = useState(true);
    const [userType, setUserType] = useState("");


    useLayoutEffect(() => {
        const isAuth = isAuthenticated();
        if (!isAuth) {
            redirect("/login")
        } else {
            axios.get(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/users/${isAuth?.userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(function (response) {
                    if (response.status === 200) {
                        if (response?.data.user.role !== "admin") {
                            router.replace("/orders")
                        }
                        setIsLoading(false);
                        setUserType(response?.data.user.role);
                    } else {
                        redirect("/login")
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [])

    if (userType !== "admin") {
        return <></>
    } else
        return (
            <div>
                <div className='mb-2'>
                    {props.userType === "Admin" ?
                        <div role="tablist" className="tabs tabs-lifted md:tabs-lg">
                            <div role="tab" className={`tab cursor-default ${pathName === "/orders" ? "tab-active [--tab-bg:#A9CCE3] font-bold" : ""} md:text-xl`}>
                                <Link href={"/orders"}>Ordini</Link>
                            </div>
                            <div role="tab" className={`tab cursor-default ${pathName === "/aggiungi-commessa" ? "tab-active [--tab-bg:#BAA8D2] font-bold" : ""} md:text-xl`}>
                                <Link href={"/aggiungi-commessa"}>Aggiungi</Link>
                            </div>
                            <div role="tab" className={`tab cursor-default ${pathName === "/modifica-commessa" ? "tab-active [--tab-bg:#FFE8B4] font-bold" : ""} md:text-xl`}>
                                <Link href={"/modifica-commessa"}>Gestisci</Link>
                            </div>
                            <div role="tab" className={`tab cursor-default ${pathName === "/archivio" ? "tab-active [--tab-bg:#A2D9BA] font-bold" : ""}text-sm md:text-xl`}>
                                <Link href={"/archivio"}>Archivio</Link>
                            </div>
                        </div>
                        : ""}
                </div>
            </div>

        )
}

export default Hero