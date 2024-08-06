'use client'
import { isAuthenticated } from '@/utils/Auth/Auth';
import { redirect } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios';
import Order from '@/components/elements/Order';

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

    // useEffect(() => {
    //     axios
    //         .get(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}` + "/archive/" + params.id)
    //         .then((res) => {
    //             setOrderData(res.data);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // }, [])

    const [updateGuardian, setUpdateGuardian] = useState<boolean>(false);

    useEffect(() => {
        const fetchOrders = () => {
            axios.get(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}` + "/archive/" + params.id)
                .then(response => {
                    setOrderData(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        };

        fetchOrders();

        const intervalId = setInterval(fetchOrders, 30000);
        return () => clearInterval(intervalId);
    }, [updateGuardian]);

    if (isLoading) {
        return (<div className="flex justify-center"><span className="loading loading-bars loading-lg"></span></div>)
    } else {
        return (orderData && <Order isArchived orderData={orderData} updateGuardian={setUpdateGuardian} />)
    };
}
