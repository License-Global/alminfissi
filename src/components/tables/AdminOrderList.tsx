import Link from "next/link";

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
    ordersData: Order[]
}

const AdminOrderList = (props: Props) => {
    return (

        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Responsabile</th>
                        <th>Urgenza</th>
                    </tr>
                </thead>
                <tbody>
                    {props?.ordersData.map((order) => (
                        <tr className="hover:bg-slate-300 mx-8" key={order._id}>
                            <td className=' font-bold'>
                                <Link href={`/modifica-commessa/${order._id}`}>{order.orderName}</Link></td>
                            <td>{order.orderManager}</td>
                            <td>{order.urgency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminOrderList