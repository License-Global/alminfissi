'use client'
import React, { useEffect, useState } from 'react'
import { status } from '@/utils/enums/status'
import { IoIosMail } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";
import { differenceInMinutes } from "date-fns";
import Timer from './Timer';
import NoteModal from './NoteModal';
import { changeStatus, completeActivity } from '@/utils/libs/crud';
import { toast, ToastContainer } from 'react-toastify';
import Progress from './OrderElements/Progress';
import axios from 'axios';
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';


interface Order {
    activity: {
        [key: string]: Activity;
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
    _id: string;
    orderName: string;
    materialShelf: string;
    accessori: string;
    urgency: string;
    orderManager: string;
    note?: string;
    __v: number;
}

interface Activity {
    expire: string;
    status: string;
    note: string;
    completed: string;
    activityManager: string;
}

type Props = {
    orderData: Order
    isArchived?: boolean
}

const Order = (props: Props) => {
    const pathName = usePathname();

    const [RACCstat, setRACCstat] = useState(props.orderData.activity.ricezioneAccessori.status);
    const [RAstat, setRAstat] = useState(props.orderData.activity.ricezioneAlluminio.status);
    const [RVstat, setRVstat] = useState(props.orderData.activity.ricezioneVetri.status);
    const [TAGstat, setTAGstat] = useState(props.orderData.activity.taglio.status);
    const [LAVstat, setLAVstat] = useState(props.orderData.activity.lavorazione.status);
    const [ASSstat, setASSstat] = useState(props.orderData.activity.assemblaggio.status);
    const [IVstat, setIVstat] = useState(props.orderData.activity.installazioneVetri.status);
    const [IMstat, setIMstat] = useState(props.orderData.activity.imballaggio.status);
    const [TRAstat, setTRAstat] = useState(props.orderData.activity.trasporto.status);
    const [DELstat, setDELstat] = useState(props.orderData.activity.consegnaInstallazione.status);

    const notifySuccess = (text: string) => toast.success(text);
    const notifyError = (text: string) => toast.error(text);

    const router = useRouter();

    const getCompletedActivitiesCount = (orderData: Order): number => {
        if (props.isArchived) {
            return 0;
        }
        let completedCount = 0;
        Object.values(orderData.activity).forEach((activity) => {
            if (activity.completed && new Date(activity.completed) instanceof Date && !isNaN(new Date(activity.completed).getTime())) {
                completedCount++;
            }
        });
        return completedCount;
    };

    const archiveOrder = () => {
        axios.post(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/archive/${props.orderData._id}`)
            .then(function (response) {
                if (response.status === 200 || 201) {
                    notifySuccess('Commessa archiviata con successo');
                }
                else {
                    notifyError('Qualcosa è andato storto, riprova più tardi');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const handleChangeRACCstat = (event: { target: any }) => {
        if (event.target.value === 'Completato') {
            completeActivity(props.orderData._id, 'ricezioneAccessori')
            changeStatus(props.orderData._id, 'ricezioneAccessori', event.target.value)
            setRACCstat(event.target.value);

        } else {
            changeStatus(props.orderData._id, 'ricezioneAccessori', event.target.value)
            setRACCstat(event.target.value);
        }
    };
    const handleChangeRAstat = (event: { target: any }) => {
        if (event.target.value === 'Completato') {
            completeActivity(props.orderData._id, 'ricezioneAlluminio')
            changeStatus(props.orderData._id, 'ricezioneAlluminio', event.target.value)
            setRAstat(event.target.value);

        } else {
            changeStatus(props.orderData._id, 'ricezioneAlluminio', event.target.value)
            setRAstat(event.target.value);
        }
    };
    const handleChangeRVstat = (event: { target: any }) => {
        if (event.target.value === 'Completato') {
            completeActivity(props.orderData._id, 'ricezioneVetri')
            changeStatus(props.orderData._id, 'ricezioneVetri', event.target.value)
            setRVstat(event.target.value);

        } else {
            changeStatus(props.orderData._id, 'ricezioneVetri', event.target.value)
            setRVstat(event.target.value);
        }
    };
    const handleChangeTAGstat = (event: { target: any }) => {
        if (event.target.value === 'Completato') {
            completeActivity(props.orderData._id, 'taglio')
            changeStatus(props.orderData._id, 'taglio', event.target.value)
            setTAGstat(event.target.value);

        } else {
            changeStatus(props.orderData._id, 'taglio', event.target.value)
            setTAGstat(event.target.value);
        }
    };
    const handleChangeLAVstat = (event: { target: any }) => {
        if (event.target.value === 'Completato') {
            completeActivity(props.orderData._id, 'lavorazione')
            changeStatus(props.orderData._id, 'lavorazione', event.target.value)
            setLAVstat(event.target.value);

        } else {
            changeStatus(props.orderData._id, 'lavorazione', event.target.value)
            setLAVstat(event.target.value);
        }
    };
    const handleChangeASSstat = (event: { target: any }) => {
        if (event.target.value === 'Completato') {
            completeActivity(props.orderData._id, 'assemblaggio')
            changeStatus(props.orderData._id, 'assemblaggio', event.target.value)
            setASSstat(event.target.value);

        } else {
            changeStatus(props.orderData._id, 'assemblaggio', event.target.value)
            setASSstat(event.target.value);
        }
    };
    const handleChangeIVstat = (event: { target: any }) => {
        if (event.target.value === 'Completato') {
            completeActivity(props.orderData._id, 'installazioneVetri')
            changeStatus(props.orderData._id, 'installazioneVetri', event.target.value)
            setIVstat(event.target.value);

        } else {
            changeStatus(props.orderData._id, 'installazioneVetri', event.target.value)
            setIVstat(event.target.value);
        }
    };
    const handleChangeIMstat = (event: { target: any }) => {
        if (event.target.value === 'Completato') {
            completeActivity(props.orderData._id, 'imballaggio')
            changeStatus(props.orderData._id, 'imballaggio', event.target.value)
            setIMstat(event.target.value);

        } else {
            changeStatus(props.orderData._id, 'imballaggio', event.target.value)
            setIMstat(event.target.value);
        }
    };
    const handleChangeTRAstat = (event: { target: any }) => {
        if (event.target.value === 'Completato') {
            completeActivity(props.orderData._id, 'trasporto')
            changeStatus(props.orderData._id, 'trasporto', event.target.value)
            setTRAstat(event.target.value);

        } else {
            changeStatus(props.orderData._id, 'trasporto', event.target.value)
            setTRAstat(event.target.value);
        }
    };
    const handleChangeDELstat = (event: { target: any }) => {
        if (event.target.value === 'Completato') {
            completeActivity(props.orderData._id, 'consegnaInstallazione')
            changeStatus(props.orderData._id, 'consegnaInstallazione', event.target.value)
            setDELstat(event.target.value);

        } else {
            changeStatus(props.orderData._id, 'consegnaInstallazione', event.target.value)
            setDELstat(event.target.value);
        }
    };

    const handleUrgency = () => {
        if (props.orderData.urgency === 'Alta') {
            return ("border-yellow-500");
        } else if (props.orderData.urgency === 'Media') {
            return ("border-green-500");
        } else if (props.orderData.urgency === 'Bassa') {
            return ("border-blue-500");
        } else if (props.orderData.urgency === 'Urgente') {
            return ("border-red-500");
        }
    }


    const handleTargetLabel = (expire: string, completed: string | null) => {
        if (completed) {
            if (Math.abs(differenceInMinutes(expire, completed)) < 5) {
                return (<button onClick={() => console.log(differenceInMinutes(expire, completed))} className=' w-full cursor-default btn rounded-xl btn-info'>OK</button>)
            }
            else if (expire > completed) {
                return (<button className=' w-full cursor-default btn rounded-xl btn-accent'>{"Anticipo di " + Math.abs(differenceInMinutes(expire, completed)) + " minuti"}</button>)
            }
            else if (expire < completed) {
                return (<button className=' w-full cursor-default btn rounded-xl btn-error'>{"Ritardo di " + Math.abs(differenceInMinutes(expire, completed)) + " minuti"}</button>)
            }
        }
        else {
            return (<Timer targetDate={expire} />)
        }
    };

    const handleDelete = () => {
        if (pathName.includes('archivio')) {
            axios.delete(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/archive/${props.orderData?._id}`)
                .then(function (response) {
                    if (response.status === 200) {
                        router.replace("/archivio");
                    } else notifyError("Qualcosa è andato storto!")
                })
                .catch(function (error) {
                    console.log(error);
                });
            return;
        }
    }

    return (
        <>
            <ToastContainer style={{ zIndex: 9999 }} autoClose={3000} pauseOnHover={false} toastClassName={"z-10"} limit={1} />
            <NoteModal note={props.orderData.activity.ricezioneAccessori.note} id={props.orderData._id} label='Ricezione accessori' activity='ricezioneAccessori' />
            <NoteModal note={props.orderData.activity.ricezioneAlluminio.note} id={props.orderData._id} label='Ricezione alluminio' activity='ricezioneAlluminio' />
            <NoteModal note={props.orderData.activity.ricezioneVetri.note} id={props.orderData._id} label='Ricezione vetri' activity='ricezioneVetri' />
            <NoteModal note={props.orderData.activity.taglio.note} id={props.orderData._id} label='Taglio' activity='taglio' />
            <NoteModal note={props.orderData.activity.lavorazione.note} id={props.orderData._id} label='Lavorazione' activity='lavorazione' />
            <NoteModal note={props.orderData.activity.assemblaggio.note} id={props.orderData._id} label='Assemblaggio' activity='assemblaggio' />
            <NoteModal note={props.orderData.activity.installazioneVetri.note} id={props.orderData._id} label='Installazione vetri' activity='installazioneVetri' />
            <NoteModal note={props.orderData.activity.imballaggio.note} id={props.orderData._id} label='Imballaggio' activity='imballaggio' />
            <NoteModal note={props.orderData.activity.trasporto.note} id={props.orderData._id} label='Trasporto' activity='trasporto' />
            <NoteModal note={props.orderData.activity.consegnaInstallazione.note} id={props.orderData._id} label='Consegna e/o installazione' activity='consegnaInstallazione' />

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Attenzione!</h3>
                    <p className="py-4">Sicuro di voler eliminare la commessa?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <div className='flex gap-4'>
                                <button className="btn">Annulla</button>
                                <button onClick={() => handleDelete()} className="btn btn-error">Elimina</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>

            <div className=' card my-2 py-2 px-6 mx-6 rounded-xl md:text-lg bg-slate-100 border border-black'>
                <div className={`flex flex-col md:flex-row items-center md:justify-between text-center gap-4 mb-8 rounded-xl p-4 border-4 ${handleUrgency()}`}>
                    <div>
                        <p className='font-bold'>Commessa</p>
                        <p className=' text-center text-lg'>{props.orderData.orderName}</p>
                    </div>
                    <div>
                        <p className='font-bold'>Priorità</p>
                        <p className=' text-center text-lg'>{props.orderData.urgency}</p>
                    </div>
                    <div>
                        <p className='font-bold'>Responsabile</p>
                        <p className=' text-center text-lg'>{props.orderData.orderManager}</p>
                    </div>
                    <div>
                        <p className='font-bold'>Scaffa accessori</p>
                        <p className=' text-center text-lg'>{props.orderData.accessori}</p>
                    </div>
                    <div>
                        <p className='font-bold'>Scaffa materiale</p>
                        <p className=' text-center text-lg'>{props.orderData.materialShelf}</p>
                    </div>
                </div>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table table-sm text-center text-md md:text-lg">
                            <thead>
                                <tr className='text-lg font-bold text-center'>
                                    <th>Attività</th>
                                    <th>Resp.</th>
                                    <th>Scadenza</th>
                                    <th>Completato</th>
                                    <th>Stato</th>
                                    <th>Obiettivo</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>



                                <tr className='hover:bg-slate-300  border-b-2 border-black'>
                                    <td className="font-semibold">Ricezione Accessori</td>
                                    <td>{props.orderData.activity.ricezioneAccessori.activityManager}</td>
                                    <td>{new Date(props.orderData.activity.ricezioneAccessori.expire).toLocaleDateString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                    <td>{props.orderData.activity.ricezioneAccessori.completed ? new Date(props.orderData.activity.ricezioneAccessori.completed).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : '--'}</td>
                                    <td>
                                        <select disabled={RACCstat === 'Completato' ? true : false} className='select select-bordered w-full max-w-xs' value={RACCstat} onChange={handleChangeRACCstat}>
                                            <option className={`${RACCstat != "Standby" ? "hidden" : ""}`} value={"Standby"}>Standby</option>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{handleTargetLabel(props.orderData.activity.ricezioneAccessori.expire, props.orderData.activity.ricezioneAccessori.completed)}</td>
                                    <td>
                                        <div>
                                            {props?.orderData?.activity?.ricezioneAccessori?.note?.trim() !== '' ?
                                                <IoIosMail className='cursor-pointer' onClick={() => { (document.getElementById('modal_ricezioneAccessori_' + props.orderData._id) as HTMLDialogElement | null)?.showModal(); }} size={32} /> :
                                                <IoMailOutline className='cursor-pointer' onClick={() => { (document.getElementById('modal_ricezioneAccessori_' + props.orderData._id) as HTMLDialogElement | null)?.showModal(); }} size={32} />}
                                        </div>
                                    </td>
                                </tr>

                                <tr className='hover:bg-slate-300  border-b-2 border-black'>
                                    <td className="font-semibold">Ricezione Alluminio</td>
                                    <td>{props.orderData.activity.ricezioneAlluminio.activityManager}</td>
                                    <td>{new Date(props.orderData.activity.ricezioneAlluminio.expire).toLocaleDateString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                    <td>{props.orderData.activity.ricezioneAlluminio.completed ? new Date(props.orderData.activity.ricezioneAlluminio.completed).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : '--'}</td>
                                    <td>
                                        <select disabled={RAstat === 'Completato' ? true : false} className='select select-bordered w-full max-w-xs' value={RAstat} onChange={handleChangeRAstat}>
                                            <option className={`${RAstat != "Standby" ? "hidden" : ""}`} value={"Standby"}>Standby</option>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{handleTargetLabel(props.orderData.activity.ricezioneAlluminio.expire, props.orderData.activity.ricezioneAlluminio.completed)}</td>
                                    <td>
                                        <div>
                                            {props?.orderData?.activity?.ricezioneAlluminio?.note?.trim() !== '' ?
                                                <IoIosMail className='cursor-pointer' onClick={() => { (document.getElementById('modal_ricezioneAlluminio_' + props.orderData._id) as HTMLDialogElement | null)?.showModal(); }} size={32} /> :
                                                <IoMailOutline className='cursor-pointer' onClick={() => { (document.getElementById('modal_ricezioneAlluminio_' + props.orderData._id) as HTMLDialogElement | null)?.showModal(); }} size={32} />}
                                        </div>
                                    </td>
                                </tr>





                                <tr className='hover:bg-slate-300 border-b-2 border-black'>
                                    <td className="font-semibold">Ricezione vetri</td>
                                    <td>{props.orderData.activity.ricezioneVetri.activityManager}</td>
                                    <td>{new Date(props.orderData.activity.ricezioneVetri.expire).toLocaleDateString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                    <td>{props.orderData.activity.ricezioneVetri.completed ? new Date(props.orderData.activity.ricezioneVetri.completed).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : "--"}</td>
                                    <td>
                                        <select disabled={RVstat === 'Completato' ? true : false} className='select select-bordered w-full max-w-xs' value={RVstat} onChange={handleChangeRVstat}>
                                            <option className={`${RVstat != "Standby" ? "hidden" : ""}`} value={"Standby"}>Standby</option>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{handleTargetLabel(props.orderData.activity.ricezioneVetri.expire, props.orderData.activity.ricezioneVetri.completed)}</td>
                                    <td>
                                        <div>
                                            {props?.orderData?.activity?.ricezioneVetri?.note?.trim() !== '' ?
                                                <IoIosMail className='cursor-pointer' onClick={() => (document.getElementById('modal_ricezioneVetri_' + props.orderData._id) as HTMLDialogElement | null)?.showModal()} size={32} /> :
                                                <IoMailOutline className='cursor-pointer' onClick={() => (document.getElementById('modal_ricezioneVetri_' + props.orderData._id) as HTMLDialogElement | null)?.showModal()} size={32} />
                                            }
                                        </div>
                                    </td>
                                </tr>




                                <tr className='hover:bg-slate-300 border-b-2 border-black'>
                                    <td className="font-semibold">Taglio</td>
                                    <td>{props.orderData.activity.taglio.activityManager}</td>
                                    <td>{new Date(props.orderData.activity.taglio.expire).toLocaleDateString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                    <td>{props.orderData.activity.taglio.completed ? new Date(props.orderData.activity.taglio.completed).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : "--"}</td>
                                    <td>
                                        <select disabled={TAGstat === 'Completato' ? true : false} className='select select-bordered w-full max-w-xs' value={TAGstat} onChange={handleChangeTAGstat}>
                                            <option className={`${TAGstat != "Standby" ? "hidden" : ""}`} value={"Standby"}>Standby</option>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{handleTargetLabel(props.orderData.activity.taglio.expire, props.orderData.activity.taglio.completed)}</td>
                                    <td>
                                        <div>
                                            {props?.orderData?.activity?.taglio?.note?.trim() !== '' ?
                                                <IoIosMail className='cursor-pointer' onClick={() => (document.getElementById('modal_taglio_' + props.orderData._id) as HTMLDialogElement | null)?.showModal()} size={32} /> :
                                                <IoMailOutline className='cursor-pointer' onClick={() => (document.getElementById('modal_taglio_' + props.orderData._id) as HTMLDialogElement | null)?.showModal()} size={32} />}
                                        </div>
                                    </td>
                                </tr>



                                <tr className='hover:bg-slate-300 border-b-2 border-black '>
                                    <td className="font-semibold">Lavorazione</td>
                                    <td>{props.orderData.activity.lavorazione.activityManager}</td>
                                    <td>{new Date(props.orderData.activity.lavorazione.expire).toLocaleDateString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                    <td>{props.orderData.activity.lavorazione.completed ? new Date(props.orderData.activity.lavorazione.completed).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : "--"}</td>
                                    <td>
                                        <select disabled={LAVstat === 'Completato' ? true : false} className='select select-bordered w-full max-w-xs' value={LAVstat} onChange={handleChangeLAVstat}>
                                            <option className={`${LAVstat != "Standby" ? "hidden" : ""}`} value={"Standby"}>Standby</option>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{handleTargetLabel(props.orderData.activity.lavorazione.expire, props.orderData.activity.lavorazione.completed)}</td>
                                    <td>
                                        <div>
                                            {props?.orderData?.activity?.lavorazione?.note?.trim() !== '' ?
                                                <IoIosMail className='cursor-pointer' onClick={() => (document.getElementById('modal_lavorazione_' + props.orderData._id) as HTMLDialogElement | null)?.showModal()} size={32} /> :
                                                <IoMailOutline className='cursor-pointer' onClick={() => (document.getElementById('modal_lavorazione_' + props.orderData._id) as HTMLDialogElement | null)?.showModal()} size={32} />
                                            }</div>
                                    </td>
                                </tr>



                                <tr className='hover:bg-slate-300 border-b-2 border-black '>
                                    <td className="font-semibold">Assemblaggio</td>
                                    <td>{props.orderData.activity.assemblaggio.activityManager}</td>
                                    <td>{new Date(props.orderData.activity.assemblaggio.expire).toLocaleDateString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                    <td>{props.orderData.activity.assemblaggio.completed ? new Date(props.orderData.activity.assemblaggio.completed).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : "--"}</td>
                                    <td>
                                        <select disabled={ASSstat === 'Completato' ? true : false} className='select select-bordered w-full max-w-xs' value={ASSstat} onChange={handleChangeASSstat}>
                                            <option className={`${ASSstat != "Standby" ? "hidden" : ""}`} value={"Standby"}>Standby</option>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{handleTargetLabel(props.orderData.activity.assemblaggio.expire, props.orderData.activity.assemblaggio.completed)}</td>
                                    <td>
                                        <div>
                                            {props?.orderData?.activity?.assemblaggio?.note?.trim() !== '' ?
                                                <IoIosMail className='cursor-pointer' onClick={() => (document.getElementById('modal_assemblaggio_' + props.orderData._id) as HTMLDialogElement | null)?.showModal()} size={32} /> :
                                                <IoMailOutline className='cursor-pointer' onClick={() => (document.getElementById('modal_assemblaggio_' + props.orderData._id) as HTMLDialogElement | null)?.showModal()} size={32} />
                                            }
                                        </div>
                                    </td>
                                </tr>



                                <tr className='hover:bg-slate-300 border-b-2 border-black '>
                                    <td className="font-semibold">Installazione vetri</td>
                                    <td>{props.orderData.activity.installazioneVetri.activityManager}</td>
                                    <td>{new Date(props.orderData.activity.installazioneVetri.expire).toLocaleDateString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                    <td>{props.orderData.activity.installazioneVetri.completed ? new Date(props.orderData.activity.installazioneVetri.completed).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : "--"}</td>
                                    <td>
                                        <select disabled={IVstat === 'Completato' ? true : false} className='select select-bordered w-full max-w-xs' value={IVstat} onChange={handleChangeIVstat}>
                                            <option className={`${IVstat != "Standby" ? "hidden" : ""}`} value={"Standby"}>Standby</option>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{handleTargetLabel(props.orderData.activity.installazioneVetri.expire, props.orderData.activity.installazioneVetri.completed)}</td>
                                    <td>
                                        <div>
                                            {
                                                props?.orderData?.activity?.installazioneVetri?.note?.trim() !== '' ?
                                                    <IoIosMail className='cursor-pointer' onClick={() => (document.getElementById('modal_installazioneVetri_' + props.orderData._id) as HTMLDialogElement | null)?.showModal()} size={32} /> :
                                                    <IoMailOutline className='cursor-pointer' onClick={() => (document.getElementById('modal_installazioneVetri_' + props.orderData._id) as HTMLDialogElement | null)?.showModal()} size={32} />
                                            }
                                        </div>
                                    </td>
                                </tr>



                                <tr className='hover:bg-slate-300 border-b-2 border-black'>
                                    <td className="font-semibold">Imballaggio</td>
                                    <td>{props.orderData.activity.imballaggio.activityManager}</td>
                                    <td>{new Date(props.orderData.activity.imballaggio.expire).toLocaleDateString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                    <td>{props.orderData.activity.imballaggio.completed ? new Date(props.orderData.activity.imballaggio.completed).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : "--"}</td>
                                    <td>
                                        <select disabled={IMstat === 'Completato' ? true : false} className='select select-bordered w-full max-w-xs' value={IMstat} onChange={handleChangeIMstat}>
                                            <option className={`${IMstat != "Standby" ? "hidden" : ""}`} value={"Standby"}>Standby</option>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{handleTargetLabel(props.orderData.activity.imballaggio.expire, props.orderData.activity.imballaggio.completed)}</td>
                                    <td>
                                        <div>
                                            {props?.orderData?.activity?.imballaggio?.note?.trim() !== '' ?
                                                <IoIosMail className='cursor-pointer' onClick={() => (document.getElementById('modal_imballaggio_' + props.orderData._id) as HTMLDialogElement | null)?.showModal()} size={32} /> :
                                                <IoMailOutline className='cursor-pointer' onClick={() => (document.getElementById('modal_imballaggio_' + props.orderData._id) as HTMLDialogElement | null)?.showModal()} size={32} />
                                            }
                                        </div>
                                    </td>
                                </tr>



                                <tr className='hover:bg-slate-300 border-b-2 border-black '>
                                    <td className="font-semibold">Trasporto</td>
                                    <td>{props.orderData.activity.trasporto.activityManager}</td>
                                    <td>{new Date(props.orderData.activity.trasporto.expire).toLocaleDateString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                    <td>{props.orderData.activity.trasporto.completed ? new Date(props.orderData.activity.trasporto.completed).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : "--"}</td>
                                    <td>
                                        <select disabled={TRAstat === 'Completato' ? true : false} className='select select-bordered w-full max-w-xs' value={TRAstat} onChange={handleChangeTRAstat}>
                                            <option className={`${TRAstat != "Standby" ? "hidden" : ""}`} value={"Standby"}>Standby</option>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{handleTargetLabel(props.orderData.activity.trasporto.expire, props.orderData.activity.trasporto.completed)}</td>
                                    <td>
                                        <div>
                                            {props?.orderData?.activity?.trasporto?.note?.trim() !== '' ?
                                                <IoIosMail className='cursor-pointer' onClick={() => (document.getElementById('modal_trasporto_' + props.orderData._id) as HTMLDialogElement | null)?.showModal()} size={32} /> :
                                                <IoMailOutline className='cursor-pointer' onClick={() => (document.getElementById('modal_trasporto_' + props.orderData._id) as HTMLDialogElement | null)?.showModal()} size={32} />
                                            }
                                        </div>
                                    </td>
                                </tr>



                                <tr className='hover:bg-slate-300 border-b-2 border-black '>
                                    <td className="font-semibold">Consegna/Install.</td>
                                    <td>{props.orderData.activity.consegnaInstallazione.activityManager}</td>
                                    <td>{new Date(props.orderData.activity.consegnaInstallazione.expire).toLocaleDateString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                    <td>{props.orderData.activity.consegnaInstallazione.completed ? new Date(props.orderData.activity.consegnaInstallazione.completed).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : "--"}</td>
                                    <td>
                                        <select disabled={DELstat === 'Completato' ? true : false} className='select select-bordered w-full max-w-xs' value={DELstat} onChange={handleChangeDELstat}>
                                            <option className={`${DELstat != "Standby" ? "hidden" : ""}`} value={"Standby"}>Standby</option>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        {handleTargetLabel(props.orderData.activity.consegnaInstallazione.expire, props.orderData.activity.consegnaInstallazione.completed)}
                                    </td>
                                    <td>
                                        <div>
                                            {props?.orderData?.activity?.consegnaInstallazione?.note?.trim() !== '' ?
                                                <IoIosMail className='cursor-pointer' onClick={() => (document.getElementById('modal_consegnaInstallazione_' + props.orderData._id) as HTMLDialogElement | null)?.showModal()} size={32} /> :
                                                <IoMailOutline className='cursor-pointer' onClick={() => (document.getElementById('modal_consegnaInstallazione_' + props.orderData._id) as HTMLDialogElement | null)?.showModal()} size={32} />
                                            }
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                </div>
                {pathName.includes('archivio') ? null :
                    <div className='flex justify-between items-center center my-4'>
                        <Progress progressValue={getCompletedActivitiesCount(props.orderData)} />
                        <button disabled={getCompletedActivitiesCount(props.orderData) >= 10 ? false : true} onClick={() => archiveOrder()} className={`btn ${props.isArchived ? 'btn-disabled' : ''}btn-success rounded-lg w-1/4 shadow-xl`}>{props.isArchived ? "Archiviato" : "Archivia"}</button>
                    </div>
                }
                {
                    pathName.includes('archivio') ? <div className='flex justify-center my-2'><p className="btn btn-error btn-lg rounded-xl w-32" onClick={() => {
                        const modalElement = document.getElementById('my_modal_1') as HTMLDialogElement;
                        if (modalElement) {
                            modalElement.showModal();
                        } else {
                            console.error('Modal element not found');
                        }
                    }}>Elimina</p></div> : null
                }
            </div>
        </>
    )
}

export default Order