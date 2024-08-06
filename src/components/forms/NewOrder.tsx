import React, { useState, useEffect, FormEvent } from 'react';
import { Worker } from '@/utils/types';
import axios from 'axios';
import NewOrderActivity from '../elements/OrderElements/NewOrderActivity';
import { activities } from '@/utils/enums/activities';
import { ToastContainer, toast } from 'react-toastify';

type Props = {}

const NewOrder = (props: Props) => {
    const [orderName, setOrderName] = useState<string>("");
    const [materialShelf, setMaterialShelf] = useState<string>("");
    const [urgency, setUrgency] = useState<string>("");
    const [accessori, setAccessori] = useState<string>("");
    const [orderManager, setOrderManager] = useState<string>("");

    const [workers, setWorkers] = useState<Worker[]>([]);
    const [activitiesData, setActivitiesData] = useState<{ [key: string]: { activityExpire: Date, activityManager: string, activityNote: string } }>({});
    const orderData = {
        orderName: orderName,
        materialShelf: materialShelf,
        accessori: accessori,
        urgency: urgency,
        orderManager: orderManager,
        activity: {
            ricezioneAccessori: {
                expire: activitiesData.ricezioneAccessori?.activityExpire,
                completed: "",
                status: "Standby",
                activityManager: activitiesData.ricezioneAccessori?.activityManager,
                note: activitiesData.ricezioneAccessori?.activityNote.length > 0 ? [{ content: activitiesData.ricezioneAccessori?.activityNote }] : []
            },
            ricezioneAlluminio: {
                expire: activitiesData.ricezioneAlluminio?.activityExpire,
                completed: "",
                status: "Standby",
                activityManager: activitiesData.ricezioneAlluminio?.activityManager,
                note: activitiesData.ricezioneAlluminio?.activityNote.length > 0 ? [{ content: activitiesData.ricezioneAlluminio?.activityNote }] : []
            },
            ricezioneVetri: {
                expire: activitiesData.ricezioneVetri?.activityExpire,
                completed: "",
                status: "Standby",
                activityManager: activitiesData.ricezioneVetri?.activityManager,
                note: activitiesData.ricezioneVetri?.activityNote.length > 0 ? [{ content: activitiesData.ricezioneVetri?.activityNote }] : []
            },
            taglio: {
                expire: activitiesData.taglio?.activityExpire,
                completed: "",
                status: "Standby",
                activityManager: activitiesData.taglio?.activityManager,
                note: activitiesData.taglio?.activityNote.length > 0 ? [{ content: activitiesData.taglio?.activityNote }] : []
            },
            lavorazione: {
                expire: activitiesData.lavorazione?.activityExpire,
                completed: "",
                status: "Standby",
                activityManager: activitiesData.lavorazione?.activityManager,
                note: activitiesData.lavorazione?.activityNote.length > 0 ? [{ content: activitiesData.lavorazione?.activityNote }] : []
            },
            assemblaggio: {
                expire: activitiesData.assemblaggio?.activityExpire,
                completed: "",
                status: "Standby",
                activityManager: activitiesData.assemblaggio?.activityManager,
                note: activitiesData.assemblaggio?.activityNote.length > 0 ? [{ content: activitiesData.assemblaggio?.activityNote }] : []
            },
            installazioneVetri: {
                expire: activitiesData.installazioneVetri?.activityExpire,
                completed: "",
                status: "Standby",
                activityManager: activitiesData.installazioneVetri?.activityManager,
                note: activitiesData.installazioneVetri?.activityNote.length > 0 ? [{ content: activitiesData.installazioneVetri?.activityNote }] : []
            },
            imballaggio: {
                expire: activitiesData.imballaggio?.activityExpire,
                completed: "",
                status: "Standby",
                activityManager: activitiesData.imballaggio?.activityManager,
                note: activitiesData.imballaggio?.activityNote.length > 0 ? [{ content: activitiesData.imballaggio?.activityNote }] : []
            },
            trasporto: {
                expire: activitiesData.trasporto?.activityExpire,
                completed: "",
                status: "Standby",
                activityManager: activitiesData.trasporto?.activityManager,
                note: activitiesData.trasporto?.activityNote.length > 0 ? [{ content: activitiesData.trasporto?.activityNote }] : []
            },
            consegnaInstallazione: {
                expire: activitiesData.consegnaInstallazione?.activityExpire,
                completed: "",
                status: "Standby",
                activityManager: activitiesData.consegnaInstallazione?.activityManager,
                note: activitiesData.consegnaInstallazione?.activityNote.length > 0 ? [{ content: activitiesData.consegnaInstallazione?.activityNote }] : []
            },
        }
    }

    const notifySuccess = (text: string) => toast.success(text);
    const notifyError = (text: string) => toast.error(text);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/personale`)
            .then(response => {
                setWorkers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleActivityDataChange = (activityTitle: string, data: { activityExpire: Date, activityManager: string, activityNote: string }) => {
        setActivitiesData(prevData => ({ ...prevData, [activityTitle]: data }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/orders`, orderData)
            .then(function (response) {
                if (response.status === 201) {
                    notifySuccess("Commessa inserita con successo!")
                    // resetFields();
                } else notifyError("Qualcosa è andato storto!")
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div className='m-4'>
            <ToastContainer style={{ zIndex: 9999 }} autoClose={2000} pauseOnHover={false} toastClassName={"z-10"} />
            <div className='flex justify-center'>
                <h2 className='my-4 text-3xl text-center text-pretty font-semibold'>Dati commessa</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='my-8 mx-8 flex justify-center flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-center'>
                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text font-semibold text-lg">Nome cliente / Numero commessa</span>
                        </div>
                        <input required value={orderName} onChange={(e) => setOrderName(e.target.value)} type="text" placeholder="Commessa..." className="input input-bordered w-full max-w-xs" />
                    </label>


                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text font-semibold text-lg">Priorità</span>
                        </div>
                        <select value={urgency} onChange={e => setUrgency(e.target.value)} required className="select select-bordered text-xl md:text-lg">
                            <option value="" disabled hidden>Seleziona priorità</option>
                            <option>Bassa</option>
                            <option>Media</option>
                            <option>Alta</option>
                            <option className=' font-semibold'>Urgente</option>
                        </select>
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text font-semibold text-lg">Scaffa accessori</span>
                        </div>
                        <input required value={accessori} onChange={e => setAccessori(e.target.value)} type="text" placeholder="Scaffa..." className="input input-bordered w-full max-w-xs" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text font-semibold text-lg">Scaffa stoccaggio</span>
                        </div>
                        <input required value={materialShelf} onChange={e => setMaterialShelf(e.target.value)} type="text" placeholder="Scaffa..." className="input input-bordered w-full max-w-xs" />
                    </label>
                    <label className="form-control w-full max-w-xs my-8">
                        <div className="label">
                            <span className="label-text font-semibold text-xl">Responsabile commessa</span>
                        </div>
                        <select value={orderManager} onChange={e => setOrderManager(e.target.value)} required className="select text-xl select-xs md:select-md select-bordered">
                            <option value="" disabled hidden className='text-lg'>Seleziona responsabile</option>
                            {workers.map((worker) => (<option className='text-lg' key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>))}
                        </select>
                    </label>
                </div>
                <hr />
                <table className="md:table md:table-md table-xs md:text-xl">
                    <thead>
                        <tr className='text-xl'>
                            <th><b>Attività</b></th>
                            <th><b>Scadenza</b></th>
                            <th><b>Responsabile</b></th>
                            <th><b>Nota</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map((activity, index) => (
                            <NewOrderActivity
                                key={index}
                                activityTitle={activity.label}
                                activityValue={activity.value}
                                workers={workers}
                                onDataChange={handleActivityDataChange}
                            />
                        ))}
                    </tbody>
                </table>
                <hr />
                <div className='flex justify-end'>
                    <button type='submit' className='btn btn-success btn-lg rounded-xl m-4'>Aggiungi</button>
                </div>
            </form>
        </div>
    );
};

export default NewOrder;
