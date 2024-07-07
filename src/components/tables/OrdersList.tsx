import React, { useState, useEffect } from 'react';
import Order from '../elements/Order';
import axios from 'axios';

type Props = {};

interface Orders {
    activity: {
        [key: string]: Activity;
        ricezioneAlluminio: Activity;
        ricezioneVetri: Activity;
        taglio: Activity;
        lavorazione: Activity;
        assemblaggio: Activity;
        installazioneVetri: Activity;
        imballaggio: Activity;
        trasporto: Activity;
        consegnaInstallazione: Activity;
    };
    _id: string;
    orderName: string;
    materialShelf: string;
    priority: number;
    urgency: string;
    orderManager: string;
    note?: string;
    __v: number;
}

interface Activity {
    expire: string;
    status: string;
    note: string;
    completed: string | null;
    activityManager: string;
}

const OrdersList = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        axios.get(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/orders`)
            .then(function (response) {
                const sortedOrders = response.data.sort((a: Orders, b: Orders) => {
                    const priorityOrder: { [key: string]: number } = { 'Bassa': 1, 'Media': 2, 'Alta': 3, 'Urgente': 4 };
                    return priorityOrder[b.urgency] - priorityOrder[a.urgency]; // Ordine discendente per urgency
                });
                setOrders(sortedOrders);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div>
            <div className='flex flex-col gap-7 mt-4'>
                {orders.length >= 1 ? orders.map((order, index) => <div key={index}><Order orderData={order} /></div>) : <div className='text-center italic'>Nessun ordine presente</div>}
            </div>
        </div>
    );
}

export default OrdersList;
