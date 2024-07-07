'use client'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface Order {
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
    __v: number;
}

interface Activity {
    expire: string;
    status: string;
    note: string;
    completed: string | null;
    activityManager: string;
}

type Props = {
}

const ArchiveTable = (props: Props) => {
    const [archive, setArchive] = useState([])
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/archive`, {
        })
            .then(function (response) {
                setArchive(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nome ordine</th>
                        <th>Responsabile</th>
                        <th>Urgenza</th>
                    </tr>
                </thead>
                <tbody>
                    {archive && archive.map((order: Order) => (
                        <tr key={order._id}>
                            <td></td>
                            <td className='font-bold'><Link href={`/archivio/${order._id}`}>{order.orderName}</Link></td>
                            <td>{order.orderManager}</td>
                            <td>{order.urgency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ArchiveTable