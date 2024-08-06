import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from 'react-datepicker';
import { it } from 'date-fns/locale';
import axios from 'axios';
import { Worker } from '@/utils/types';
import { ToastContainer, toast } from 'react-toastify';

interface Note {
    date?: string;
    content?: string;
}

interface Activity {
    expire: Date;
    completed: string | null;
    status: "Lavorazione" | "Standby" | "Bloccato" | "Completato";
    target: "ok" | "anticipo" | "ritardo";
    activityManager: string;
    note: Note[];
}

interface Order {
    orderName: string;
    materialShelf: string;
    accessori: string;
    urgency: string;
    orderManager: string;
    activity: {
        ricezioneAccessori: Activity;
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
}

interface EditOrderComponentProps {
    orderId: string;
}

const EditOrder: React.FC<EditOrderComponentProps> = ({ orderId }) => {
    const [orderData, setOrderData] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [workers, setWorkers] = useState<Worker[]>([]);

    const notifySuccess = (text: string) => toast.success(text);
    const notifyError = (text: string) => toast.error(text);

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}` + "/orders/" + orderId)
            .then((res) => {
                setOrderData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });

        axios.get(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/personale`)
            .then(response => {
                setWorkers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [orderId]);

    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setOrderData(prevState => {
            if (prevState) {
                return {
                    ...prevState,
                    [name]: value,
                };
            }
            return prevState;
        });
    };

    const handleActivityChange = (activityName: keyof Order['activity'], field: string, value: string | Date) => {
        setOrderData(prevState => {
            if (prevState) {
                const currentActivity = prevState.activity[activityName];
                let newActivity = { ...currentActivity, [field]: value };

                if (field === 'expire' && value instanceof Date) {
                    // Check if new date is later than the previous date
                    if (value > currentActivity.expire) {
                        newActivity.completed = null;
                    }
                }

                if (field === 'status' && value !== "Completato") {
                    newActivity.completed = null;
                }

                return {
                    ...prevState,
                    activity: {
                        ...prevState.activity,
                        [activityName]: newActivity,
                    },
                };
            }
            return prevState;
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Send updated data to the server
        if (orderData) {
            axios.patch(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/orders/${orderId}`, orderData)
                .then(function (response) {
                    if (response.status === 200) {
                        notifySuccess("Commessa modificata con successo!");
                    } else notifyError("Qualcosa è andato storto!");
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    if (loading) return <div className='flex h-screen'>
        <span className="mx-auto loading loading-bars loading-lg"></span></div>;

    return (
        <div>
            <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg">
                <ToastContainer autoClose={2000} pauseOnHover={false} toastClassName={"z-10"} />
                <div className='grid grid-cols-4 gap-8'>
                    <div className="form-control mb-4">
                        <label className="label">Order Name:</label>
                        <input
                            type="text"
                            name="orderName"
                            className="input input-bordered"
                            value={orderData?.orderName || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">Material Shelf:</label>
                        <input
                            type="text"
                            name="materialShelf"
                            className="input input-bordered"
                            value={orderData?.materialShelf || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">Accessori:</label>
                        <input
                            type="text"
                            name="accessori"
                            className="input input-bordered"
                            value={orderData?.accessori || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">Urgency:</label>
                        <select
                            name="urgency"
                            className="select select-bordered text-xl md:text-lg"
                            value={orderData?.urgency || ''}
                            onChange={handleChange}
                        >
                            <option value="" disabled hidden>Seleziona priorità</option>
                            <option value="Bassa">Bassa</option>
                            <option value="Media">Media</option>
                            <option value="Alta">Alta</option>
                            <option value="Urgente" className=' font-semibold'>Urgente</option>
                        </select>
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">Order Manager:</label>
                        <select
                            name="orderManager"
                            className="select select-bordered text-xl md:text-lg"
                            value={orderData?.orderManager || ''}
                            onChange={handleChange}
                        >
                            <option value="" disabled hidden>Seleziona responsabile</option>
                            {workers.map((worker) => (
                                <option key={worker.workerName} value={worker.workerName}>
                                    {worker.workerName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* Activity Fields */}
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Attività</th>
                                <th>Scadenza</th>
                                <th>Status</th>
                                <th>Responsabile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData && Object.keys(orderData.activity).map((activityKey) => (
                                <tr key={activityKey} className='hover:bg-slate-100 max-w-fit'>
                                    <td>
                                        {activityKey}
                                    </td>
                                    <td className='mb-2'>
                                        <ReactDatePicker
                                            locale={it}
                                            showTimeSelect
                                            dateFormat='Pp'
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            className='cursor-pointer input input-bordered '
                                            calendarClassName="custom-calendar ml-24"
                                            minDate={new Date()}
                                            selected={new Date(orderData.activity[activityKey as keyof Order['activity']].expire)}
                                            onChange={(date: Date) => handleActivityChange(activityKey as keyof Order['activity'], 'expire', new Date(date))}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            className="select select-bordered"
                                            value={orderData.activity[activityKey as keyof Order['activity']].status}
                                            onChange={(e) => handleActivityChange(activityKey as keyof Order['activity'], 'status', e.target.value)}
                                        >
                                            <option value="Standby">Standby</option>
                                            <option value="Lavorazione">Lavorazione</option>
                                            <option value="Bloccato">Bloccato</option>
                                            <option value="Completato">Completato</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select value={orderData.activity[activityKey as keyof Order['activity']].activityManager} onChange={(e) => handleActivityChange(activityKey as keyof Order['activity'], 'activityManager', e.target.value)} required className="select select-xs md:select-md select-bordered">
                                            <option disabled>Seleziona responsabile</option>
                                            {workers.map((worker) => (<option key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='flex justify-end mr-8'>
                    <button type="submit" className="btn btn-lg btn-success mt-4">Salva</button>
                </div>
            </form>
        </div>
    );
};

export default EditOrder;
