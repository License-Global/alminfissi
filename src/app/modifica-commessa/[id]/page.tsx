'use client'
import { isAuthenticated } from '@/utils/Auth/Auth';
import { redirect } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import AddOrderForm from '@/components/forms/AddOrderForm';
import axios from 'axios';

type Props = {}

export default function Page({ params }: { params: { id: string } }) {
    const [isLoading, setIsLoading] = useState(true);
    const [orderData, setOrderData] = useState();

    useLayoutEffect(() => {
        const isAuth = isAuthenticated();
        if (!isAuth) {
            redirect("/login")
        } else setIsLoading(false);
    }, [])

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}` + "/orders/" + params.id)
            .then((res) => {
                setOrderData(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [])

    if (isLoading) {
        return (<div className="flex justify-center"><span className="loading loading-bars loading-lg"></span></div>)
    } else {
        return (<div>{orderData && <AddOrderForm isEdit={true} orderData={orderData} />}</div>)
    };
}
