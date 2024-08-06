'use client'
import { isAuthenticated } from '@/utils/Auth/Auth';
import { redirect } from 'next/navigation';
import React, { useLayoutEffect, useState } from 'react'
import EditOrder from '@/components/forms/EditOrder';

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
    return (<EditOrder orderId={params.id} />)
};

