'use client'
import { isAuthenticated } from '@/utils/Auth/Auth';
import { redirect } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import AdminOrderList from '@/components/tables/AdminOrderList';
import axios from 'axios';

type Props = {}

const Page = (props: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [ordersData, setOrdersData] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}` + "/orders")
            .then((res) => {
                setOrdersData(res.data);
            })
            .catch((err) => {
                console.error(err);
            });


    }, [])


    useLayoutEffect(() => {
        const isAuth = isAuthenticated();
        if (!isAuth) {
            redirect("/login")
        } else setIsLoading(false);
    }, [])


    if (isLoading) {
        return (<div className="flex justify-center"><span className="loading loading-bars loading-lg"></span></div>)
    } else {
        return (<div>{ordersData.length >= 1 ? <AdminOrderList ordersData={ordersData} /> : <div className='text-center italic'>Nessun ordine presente</div>}</div>)
    };
}

export default Page