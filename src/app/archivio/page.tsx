'use client'
import { isAuthenticated } from '@/utils/Auth/Auth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import React, { useLayoutEffect, useState } from 'react'
import ArchiveTable from '@/components/tables/ArchiveTable';

type Props = {}

const Page = (props: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userType, setUserType] = useState("");
    const router = useRouter();


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


    if (isLoading) {
        return (<div className="flex justify-center"><span className="loading loading-bars loading-lg"></span></div>)
    } else {
        return (<div className="flex justify-center flex-col"><ArchiveTable /></div>)
    };
}

export default Page