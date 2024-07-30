'use client'
import React, { useLayoutEffect, useState } from 'react'
import Settings from '@/components/Settings/Settings'
import { isAuthenticated } from '@/utils/Auth/Auth'
import axios from 'axios'
import { redirect, usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

type Props = {}

const Impostazioni = (props: Props) => {
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
    return (
        <div>
            <Settings />
        </div>
    )
}

export default Impostazioni