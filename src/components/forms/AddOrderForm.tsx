'use client'
import React, { useState, FormEvent, useEffect } from 'react'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Order from '../elements/Order';
import { registerLocale } from 'react-datepicker';
import { it } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import NewOrderNote from '../elements/OrderElements/NewOrderNote';
registerLocale('it', it);

type Props = {
    orderData?: Order;
    isEdit: boolean;
}

type Worker = {
    workerName: string;
};

const AddOrderForm = (props: Props) => {
    const [workers, setWorkers] = useState<Worker[]>([])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/personale`)
            .then(response => {
                setWorkers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])


    // Date states
    const [ricACCDate, setRicACCDate] = useState(props.isEdit != true ? new Date() : new Date(props.orderData?.activity.ricezioneAccessori.expire!));
    const [ricAllDate, setRicAllDate] = useState(props.isEdit != true ? new Date() : new Date(props.orderData?.activity.ricezioneAlluminio.expire!));
    const [ricVetDate, setVetAllDate] = useState(props.isEdit != true ? new Date() : new Date(props.orderData?.activity.ricezioneVetri.expire!));
    const [taglioDate, setTaglioDate] = useState(props.isEdit != true ? new Date() : new Date(props.orderData?.activity.taglio.expire!));
    const [lavorazioneDate, setLavorazioneDate] = useState(props.isEdit != true ? new Date() : new Date(props.orderData?.activity.lavorazione.expire!));
    const [assemblaggioDate, setAssemblaggioDate] = useState(props.isEdit != true ? new Date() : new Date(props.orderData?.activity.assemblaggio.expire!));
    const [instVetri, setInstVetriDate] = useState(props.isEdit != true ? new Date() : new Date(props.orderData?.activity.installazioneVetri.expire!));
    const [imballaggioDate, setImballaggioDate] = useState(props.isEdit != true ? new Date() : new Date(props.orderData?.activity.imballaggio.expire!));
    const [transportDate, setTransportDate] = useState(props.isEdit != true ? new Date() : new Date(props.orderData?.activity.trasporto.expire!));
    const [delivInstDate, setDelivInstDate] = useState(props.isEdit != true ? new Date() : new Date(props.orderData?.activity.consegnaInstallazione.expire!));

    // Order states
    const [orderName, setOrderName] = useState(props.isEdit != true ? "" : props.orderData?.orderName!);
    const [materialShelf, setMaterialShelf] = useState(props.isEdit != true ? "" : props.orderData?.materialShelf!);
    const [urgency, setUrgency] = useState(props.isEdit != true ? "" : props.orderData?.urgency!);
    const [accessori, setAccessori] = useState(props.isEdit != true ? "" : props.orderData?.accessori!);
    const [orderManager, setOrderManager] = useState(props.isEdit != true ? "" : props.orderData?.orderManager!);

    //Activity states

    const [RACCres, setRACCres] = useState(props.isEdit != true ? "" : props.orderData?.activity.ricezioneAccessori.activityManager!);
    const [RAres, setRAres] = useState(props.isEdit != true ? "" : props.orderData?.activity.ricezioneAlluminio.activityManager!);
    const [RVres, setRVres] = useState(props.isEdit != true ? "" : props.orderData?.activity.ricezioneVetri.activityManager!);
    const [TAGRes, setTAGRes] = useState(props.isEdit != true ? "" : props.orderData?.activity.taglio.activityManager!);
    const [LAVres, setLAVres] = useState(props.isEdit != true ? "" : props.orderData?.activity.lavorazione.activityManager!);
    const [ASSres, setASSres] = useState(props.isEdit != true ? "" : props.orderData?.activity.assemblaggio.activityManager!);
    const [IVres, setIVres] = useState(props.isEdit != true ? "" : props.orderData?.activity.installazioneVetri.activityManager!);
    const [IMres, setIMres] = useState(props.isEdit != true ? "" : props.orderData?.activity.imballaggio.activityManager!);
    const [TRAres, setTRAres] = useState(props.isEdit != true ? "" : props.orderData?.activity.trasporto.activityManager!);
    const [DELres, setDELres] = useState(props.isEdit != true ? "" : props.orderData?.activity.consegnaInstallazione.activityManager!);

    //Note states

    const [RACCNote, setRACCNote] = useState(props.isEdit != true ? [] : props.orderData?.activity.ricezioneAccessori.note);
    const [RANote, setRANote] = useState(props.isEdit != true ? [] : props.orderData?.activity.ricezioneAlluminio.note);
    const [RVNote, setRVNote] = useState(props.isEdit != true ? [] : props.orderData?.activity.ricezioneVetri.note);
    const [TAGNote, setTAGNote] = useState(props.isEdit != true ? [] : props.orderData?.activity.taglio.note);
    const [LAVNote, setLAVNote] = useState(props.isEdit != true ? [] : props.orderData?.activity.lavorazione.note);
    const [ASSNote, setASSNote] = useState(props.isEdit != true ? [] : props.orderData?.activity.assemblaggio.note);
    const [IVNote, setIVNote] = useState(props.isEdit != true ? [] : props.orderData?.activity.installazioneVetri.note);
    const [IMNote, setIMNote] = useState(props.isEdit != true ? [] : props.orderData?.activity.imballaggio.note);
    const [TRANote, setTRANote] = useState(props.isEdit != true ? [] : props.orderData?.activity.trasporto.note);
    const [DELNote, setDELNote] = useState(props.isEdit != true ? [] : props.orderData?.activity.consegnaInstallazione.note);

    //Completed states

    const [RACCCompleted, setRACCCompleted] = useState(props.isEdit != true ? "" : props.orderData?.activity.ricezioneAccessori.completed);
    const [RACompleted, setRACompleted] = useState(props.isEdit != true ? "" : props.orderData?.activity.ricezioneAlluminio.completed);
    const [RVCompleted, setRVCompleted] = useState(props.isEdit != true ? "" : props.orderData?.activity.ricezioneVetri.completed);
    const [TAGCompleted, setTAGCompleted] = useState(props.isEdit != true ? "" : props.orderData?.activity.taglio.completed);
    const [LAVCompleted, setLAVCompleted] = useState(props.isEdit != true ? "" : props.orderData?.activity.lavorazione.completed);
    const [ASSCompleted, setASSCompleted] = useState(props.isEdit != true ? "" : props.orderData?.activity.assemblaggio.completed);
    const [IVCompleted, setIVCompleted] = useState(props.isEdit != true ? "" : props.orderData?.activity.installazioneVetri.completed);
    const [IMCompleted, setIMCompleted] = useState(props.isEdit != true ? "" : props.orderData?.activity.imballaggio.completed);
    const [TRACompleted, setTRACompleted] = useState(props.isEdit != true ? "" : props.orderData?.activity.trasporto.completed);
    const [DELCompleted, setDELCompleted] = useState(props.isEdit != true ? "" : props.orderData?.activity.consegnaInstallazione.completed);

    //Status states

    const [RACCstat, setRACCstat] = useState(props.isEdit != true ? "Standby" : props.orderData?.activity.ricezioneAccessori.status);
    const [RAstat, setRAstat] = useState(props.isEdit != true ? "Standby" : props.orderData?.activity.ricezioneAlluminio.status);
    const [RVstat, setRVstat] = useState(props.isEdit != true ? "Standby" : props.orderData?.activity.ricezioneVetri.status);
    const [TAGstat, setTAGstat] = useState(props.isEdit != true ? "Standby" : props.orderData?.activity.taglio.status);
    const [LAVstat, setLAVstat] = useState(props.isEdit != true ? "Standby" : props.orderData?.activity.lavorazione.status);
    const [ASSstat, setASSstat] = useState(props.isEdit != true ? "Standby" : props.orderData?.activity.assemblaggio.status);
    const [IVstat, setIVstat] = useState(props.isEdit != true ? "Standby" : props.orderData?.activity.installazioneVetri.status);
    const [IMstat, setIMstat] = useState(props.isEdit != true ? "Standby" : props.orderData?.activity.imballaggio.status);
    const [TRAstat, setTRAstat] = useState(props.isEdit != true ? "Standby" : props.orderData?.activity.trasporto.status);
    const [DELstat, setDELstat] = useState(props.isEdit != true ? "Standby" : props.orderData?.activity.consegnaInstallazione.status);


    const [resetSwitch, setResetSwitch] = useState(false)
    const notifySuccess = (text: string) => toast.success(text);
    const notifyError = (text: string) => toast.error(text);

    const router = useRouter();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (props.isEdit) {
            axios.patch(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/orders/${props.orderData?._id}`, orderDataEdit)
                .then(function (response) {
                    if (response.status === 200) {
                        notifySuccess("Commessa modificata con successo!")
                    } else notifyError("Qualcosa è andato storto!")
                })
                .catch(function (error) {
                    console.log(error);
                });
            return;
        } else
            axios.post(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/orders`, orderData)
                .then(function (response) {
                    if (response.status === 201) {
                        notifySuccess("Commessa inserita con successo!")
                        resetFields();
                    } else notifyError("Qualcosa è andato storto!")
                })
                .catch(function (error) {
                    console.log(error);
                });
    };

    const handleDelete = () => {
        if (props.isEdit) {
            axios.delete(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/orders/${props.orderData?._id}`)
                .then(function (response) {
                    if (response.status === 200) {
                        router.replace("/orders");
                    } else notifyError("Qualcosa è andato storto!")
                })
                .catch(function (error) {
                    console.log(error);
                });
            return;
        }
    }

    const resetFields = () => {
        setRicACCDate(props.isEdit != true ? new Date() : new Date(props.orderData?.activity.ricezioneAccessori.expire!));
        setRicAllDate(props.isEdit != true ? new Date() : new Date(props.orderData?.activity.ricezioneAlluminio.expire!));
        setVetAllDate(props.isEdit != true ? new Date() : new Date(props.orderData?.activity.ricezioneVetri.expire!));
        setTaglioDate(props.isEdit != true ? new Date() : new Date(props.orderData?.activity.taglio.expire!));
        setLavorazioneDate(props.isEdit != true ? new Date() : new Date(props.orderData?.activity.lavorazione.expire!));
        setAssemblaggioDate(props.isEdit != true ? new Date() : new Date(props.orderData?.activity.assemblaggio.expire!));
        setInstVetriDate(props.isEdit != true ? new Date() : new Date(props.orderData?.activity.installazioneVetri.expire!));
        setImballaggioDate(props.isEdit != true ? new Date() : new Date(props.orderData?.activity.imballaggio.expire!));
        setTransportDate(props.isEdit != true ? new Date() : new Date(props.orderData?.activity.trasporto.expire!));
        setDelivInstDate(props.isEdit != true ? new Date() : new Date(props.orderData?.activity.consegnaInstallazione.expire!));


        setOrderName(props.isEdit != true ? "" : props.orderData?.orderName!);
        setMaterialShelf(props.isEdit != true ? "" : props.orderData?.materialShelf!);
        setUrgency(props.isEdit != true ? "" : props.orderData?.urgency!);


        setAccessori(props.isEdit != true ? "" : String(props.orderData?.accessori!));
        setOrderManager(props.isEdit != true ? "" : props.orderData?.orderManager!);
        setRAres(props.isEdit != true ? "" : props.orderData?.activity.ricezioneAlluminio.activityManager!);
        setRVres(props.isEdit != true ? "" : props.orderData?.activity.ricezioneVetri.activityManager!);
        setTAGRes(props.isEdit != true ? "" : props.orderData?.activity.taglio.activityManager!);
        setLAVres(props.isEdit != true ? "" : props.orderData?.activity.lavorazione.activityManager!);
        setASSres(props.isEdit != true ? "" : props.orderData?.activity.assemblaggio.activityManager!);
        setIVres(props.isEdit != true ? "" : props.orderData?.activity.installazioneVetri.activityManager!);
        setIMres(props.isEdit != true ? "" : props.orderData?.activity.imballaggio.activityManager!);
        setTRAres(props.isEdit != true ? "" : props.orderData?.activity.trasporto.activityManager!);
        setDELres(props.isEdit != true ? "" : props.orderData?.activity.consegnaInstallazione.activityManager!);


        setRACCNote(props.isEdit != true ? [] : props.orderData?.activity.ricezioneAccessori.note)
        setRANote(props.isEdit != true ? [] : props.orderData?.activity.ricezioneAlluminio.note)
        setRVNote(props.isEdit != true ? [] : props.orderData?.activity.ricezioneVetri.note)
        setTAGNote(props.isEdit != true ? [] : props.orderData?.activity.taglio.note)
        setLAVNote(props.isEdit != true ? [] : props.orderData?.activity.lavorazione.note)
        setASSNote(props.isEdit != true ? [] : props.orderData?.activity.assemblaggio.note)
        setIVNote(props.isEdit != true ? [] : props.orderData?.activity.installazioneVetri.note)
        setIMNote(props.isEdit != true ? [] : props.orderData?.activity.imballaggio.note)
        setTRANote(props.isEdit != true ? [] : props.orderData?.activity.trasporto.note)
        setDELNote(props.isEdit != true ? [] : props.orderData?.activity.consegnaInstallazione.note)

        setResetSwitch(prevState => !prevState)
    }

    // const [RACCNote, setRACCNote] = useState(props.isEdit != true ? [] : props.orderData?.activity.ricezioneAccessori.note);
    // const [RANote, setRANote] = useState(props.isEdit != true ? [] : props.orderData?.activity.ricezioneAlluminio.note);
    // const [RVNote, setRVNote] = useState(props.isEdit != true ? [] : props.orderData?.activity.ricezioneVetri.note);
    // const [TAGNote, setTAGNote] = useState(props.isEdit != true ? [] : props.orderData?.activity.taglio.note);
    // const [LAVNote, setLAVNote] = useState(props.isEdit != true ? [] : props.orderData?.activity.lavorazione.note);
    // const [ASSNote, setASSNote] = useState(props.isEdit != true ? [] : props.orderData?.activity.assemblaggio.note);
    // const [IVNote, setIVNote] = useState(props.isEdit != true ? [] : props.orderData?.activity.installazioneVetri.note);
    // const [IMNote, setIMNote] = useState(props.isEdit != true ? [] : props.orderData?.activity.imballaggio.note);
    // const [TRANote, setTRANote] = useState(props.isEdit != true ? [] : props.orderData?.activity.trasporto.note);
    // const [DELNote, setDELNote] = useState(props.isEdit != true ? [] : props.orderData?.activity.consegnaInstallazione.note);
    useEffect(() => {
        console.log(props.orderData?.activity.ricezioneAccessori.note)
    }, [props.orderData?.activity.ricezioneAccessori.note])

    const orderData = {
        orderName: orderName,
        materialShelf: materialShelf,
        accessori: accessori,
        urgency: urgency,
        orderManager: orderManager,
        activity: {
            ricezioneAccessori: {
                expire: ricACCDate,
                completed: RACCCompleted,
                status: RACCstat,
                activityManager: RACCres,
                note: props.isEdit ? props.orderData?.activity.ricezioneAccessori.note : RACCNote
            },
            ricezioneAlluminio: {
                expire: ricAllDate,
                completed: RACompleted,
                status: RAstat,
                activityManager: RAres,
                note: props.isEdit ? props.orderData?.activity.ricezioneAlluminio.note : RANote
            },
            ricezioneVetri: {
                expire: ricVetDate,
                completed: RVCompleted,
                status: RVstat,
                activityManager: RVres,
                note: props.isEdit ? props.orderData?.activity.ricezioneVetri : RVNote
            },
            taglio: {
                expire: taglioDate,
                completed: TAGCompleted,
                status: TAGstat,
                activityManager: TAGRes,
                note: props.isEdit ? props.orderData?.activity.taglio : TAGNote
            },
            lavorazione: {
                expire: lavorazioneDate,
                completed: LAVCompleted,
                status: LAVstat,
                activityManager: LAVres,
                note: props.isEdit ? props.orderData?.activity.lavorazione : LAVNote
            },
            assemblaggio: {
                expire: assemblaggioDate,
                comma: ASSCompleted,
                status: ASSstat,
                activityManager: ASSres,
                note: props.isEdit ? props.orderData?.activity.assemblaggio : ASSNote
            },
            installazioneVetri: {
                expire: instVetri,
                completed: IVCompleted,
                status: IVstat,
                activityManager: IVres,
                note: props.isEdit ? props.orderData?.activity.installazioneVetri : IVNote
            },
            imballaggio: {
                expire: imballaggioDate,
                completed: IMCompleted,
                status: IMstat,
                activityManager: IMres,
                note: props.isEdit ? props.orderData?.activity.imballaggio : IMNote
            },
            trasporto: {
                expire: transportDate,
                completed: TRACompleted,
                status: TRAstat,
                activityManager: TRAres,
                note: props.isEdit ? props.orderData?.activity.trasporto : TRANote
            },
            consegnaInstallazione: {
                expire: delivInstDate,
                completed: DELCompleted,
                status: DELstat,
                activityManager: DELres,
                note: props.isEdit ? props.orderData?.activity.consegnaInstallazione : DELNote
            },
        },
    };
    const orderDataEdit = {
        orderName: orderName,
        materialShelf: materialShelf,
        accessori: accessori,
        urgency: urgency,
        orderManager: orderManager,
        activity: {
            ricezioneAccessori: {
                expire: ricACCDate,
                completed: RACCCompleted,
                status: RACCstat,
                activityManager: RACCres,
                note: RACCNote
            },
            ricezioneAlluminio: {
                expire: ricAllDate,
                completed: RACompleted,
                status: RAstat,
                activityManager: RAres,
            },
            ricezioneVetri: {
                expire: ricVetDate,
                completed: RVCompleted,
                status: RVstat,
                activityManager: RVres,
            },
            taglio: {
                expire: taglioDate,
                completed: TAGCompleted,
                status: TAGstat,
                activityManager: TAGRes,
            },
            lavorazione: {
                expire: lavorazioneDate,
                completed: LAVCompleted,
                status: LAVstat,
                activityManager: LAVres,
            },
            assemblaggio: {
                expire: assemblaggioDate,
                comma: ASSCompleted,
                status: ASSstat,
                activityManager: ASSres,
            },
            installazioneVetri: {
                expire: instVetri,
                completed: IVCompleted,
                status: IVstat,
                activityManager: IVres,
            },
            imballaggio: {
                expire: imballaggioDate,
                completed: IMCompleted,
                status: IMstat,
                activityManager: IMres,
            },
            trasporto: {
                expire: transportDate,
                completed: TRACompleted,
                status: TRAstat,
                activityManager: TRAres,
            },
            consegnaInstallazione: {
                expire: delivInstDate,
                completed: DELCompleted,
                status: DELstat,
                activityManager: DELres,
            },
        },
    };

    const handleNotesChange = (updatedNotes: { date: Date, content: string }[], activity?: string) => {
        if (activity == "ricezioneAccessori") {
            setRACCNote(updatedNotes)
        } else if (activity == "ricezioneAlluminio") {
            setRANote(updatedNotes)
        } else if (activity == "ricezioneVetri") {
            setRVNote(updatedNotes)
        } else if (activity == "taglio") {
            setTAGNote(updatedNotes)
        } else if (activity == "lavorazione") {
            setLAVNote(updatedNotes)
        } else if (activity == "assemblaggio") {
            setASSNote(updatedNotes)
        } else if (activity == "installazioneVetri") {
            setIVNote(updatedNotes)
        } else if (activity == "imballaggio") {
            setIMNote(updatedNotes)
        } else if (activity == "trasporto") {
            setTRANote(updatedNotes)
        } else if (activity == "consegnaInstallazione") {
            setDELNote(updatedNotes)
        }
    };

    return (
        <div>
            <ToastContainer style={{ zIndex: 9999 }} autoClose={2000} pauseOnHover={false} toastClassName={"z-10"} />

            {/* //Modal */}
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

            <form onSubmit={handleSubmit}>
                <div className=' m-4'>
                    <div className='flex justify-center'>
                        <h2 className=' my-4 text-3xl text-center text-pretty font-semibold'>Dati commessa</h2>
                    </div>
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
                    </div>
                </div>
                <div className='border border-black'>
                    <h2 className=' my-8 text-4xl text-center text-pretty font-semibold'>Planner</h2>
                    <div className='my-4 mx-4'>
                        <label className="form-control w-full max-w-xs my-8">
                            <div className="label">
                                <span className="label-text font-semibold text-lg">Responsabile commessa</span>
                            </div>
                            <select value={orderManager} onChange={e => setOrderManager(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                <option value="" disabled hidden className='text-lg'>Seleziona responsabile</option>
                                {workers.map((worker) => (<option className='text-lg' key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>))}
                            </select>
                        </label>

                        <table className="hidden md:table md:table-md table-xs md:text-xl">
                            <thead>
                                <tr className='text-xl'>
                                    <th><b>Attività</b></th>
                                    <th><b>Scadenza</b></th>
                                    <th><b>Responsabile</b></th>
                                    <th className={`${props.isEdit ? "hidden" : ""}`}><b>Nota</b></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="md:text-xl">Ric. accessori</td>
                                    <td className='md:text-xl'>
                                        <ReactDatePicker locale={it} showTimeSelect dateFormat='Pp' timeFormat="HH:mm" timeIntervals={15} className='cursor-pointer' calendarClassName="custom-calendar" minDate={new Date()} selected={ricACCDate} onChange={(date: Date) => setRicACCDate(date)} />
                                    </td>
                                    <td>
                                        <select value={RACCres} onChange={e => setRACCres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                            <option value="" disabled hidden>Seleziona responsabile</option>
                                            {workers.map((worker) => (<option key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>))}
                                        </select>
                                    </td>
                                    <td className={`${props.isEdit ? "hidden" : ""}`}>
                                        <NewOrderNote resetSwitch={resetSwitch} onNotesChange={handleNotesChange} title='Ricezione accessori' activity='ricezioneAccessori' />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="md:text-xl">Ric. alluminio</td>
                                    <td className='md:text-xl'>
                                        <ReactDatePicker locale={it} showTimeSelect dateFormat='Pp' timeFormat="HH:mm" timeIntervals={15} className='cursor-pointer' calendarClassName="custom-calendar" minDate={new Date()} selected={ricAllDate} onChange={(date: Date) => setRicAllDate(date)} />
                                    </td>
                                    <td>
                                        <select value={RAres} onChange={e => setRAres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                            <option value="" disabled hidden>Seleziona responsabile</option>
                                            {workers.map((worker) => (<option key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>))}
                                        </select>
                                    </td>
                                    <td className={`${props.isEdit ? "hidden" : ""}`}>
                                        <NewOrderNote resetSwitch={resetSwitch} onNotesChange={handleNotesChange} title='Ricezione alluminio' activity='ricezioneAlluminio' />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="md:text-xl">Ric. vetri</td>
                                    <td className='md:text-xl'>
                                        <ReactDatePicker locale={it} showTimeSelect dateFormat='Pp' timeFormat="HH:mm" timeIntervals={15} className='cursor-pointer' calendarClassName="custom-calendar" minDate={new Date()} selected={ricVetDate} onChange={(date: Date) => setVetAllDate(date)} />
                                    </td>
                                    <td>
                                        <select value={RVres} onChange={e => setRVres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                            <option value="" disabled hidden>Seleziona responsabile</option>
                                            {workers.map((worker) => (<option key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>))}
                                        </select>
                                    </td>
                                    <td className={`${props.isEdit ? "hidden" : ""}`}>
                                        <NewOrderNote resetSwitch={resetSwitch} onNotesChange={handleNotesChange} title='Ricezione vetri' activity='ricezioneVetri' />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="md:text-xl">Taglio</td>
                                    <td className='md:text-xl'>
                                        <ReactDatePicker locale={it} showTimeSelect dateFormat='Pp' timeFormat="HH:mm" timeIntervals={15} className='cursor-pointer' calendarClassName="custom-calendar" minDate={new Date()} selected={taglioDate} onChange={(date: Date) => setTaglioDate(date)} />
                                    </td>
                                    <td>
                                        <select value={TAGRes} onChange={e => setTAGRes(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                            <option value="" disabled hidden >Seleziona responsabile</option>
                                            {workers.map((worker) => (<option key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>))}
                                        </select>
                                    </td>
                                    <td className={`${props.isEdit ? "hidden" : ""}`}>
                                        <NewOrderNote resetSwitch={resetSwitch} onNotesChange={handleNotesChange} title='Taglio' activity='taglio' />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="md:text-xl">Lavorazione</td>
                                    <td className='md:text-xl'>
                                        <ReactDatePicker locale={it} showTimeSelect dateFormat='Pp' timeFormat="HH:mm" timeIntervals={15} className='cursor-pointer' calendarClassName="custom-calendar" minDate={new Date()} selected={lavorazioneDate} onChange={(date: Date) => setLavorazioneDate(date)} />
                                    </td>
                                    <td>
                                        <select value={LAVres} onChange={e => setLAVres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                            <option value="" disabled hidden >Seleziona responsabile</option>
                                            {workers.map((worker) => (<option key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>))}
                                        </select>
                                    </td>
                                    <td className={`${props.isEdit ? "hidden" : ""}`}>
                                        <NewOrderNote resetSwitch={resetSwitch} onNotesChange={handleNotesChange} title='Lavorazione' activity='lavorazione' />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="md:text-xl">Assemblaggio</td>
                                    <td className='md:text-xl'>
                                        <ReactDatePicker locale={it} showTimeSelect dateFormat='Pp' timeFormat="HH:mm" timeIntervals={15} className='cursor-pointer' calendarClassName="custom-calendar" minDate={new Date()} selected={assemblaggioDate} onChange={(date: Date) => setAssemblaggioDate(date)} />
                                    </td>
                                    <td>
                                        <select value={ASSres} onChange={e => setASSres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                            <option value="" disabled hidden >Seleziona responsabile</option>
                                            {workers.map((worker) => (<option key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>))}
                                        </select>
                                    </td>
                                    <td className={`${props.isEdit ? "hidden" : ""}`}>
                                        <NewOrderNote resetSwitch={resetSwitch} onNotesChange={handleNotesChange} title='Assemblaggio' activity='assemblaggio' />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="md:text-xl">Inst. vetri</td>
                                    <td className='md:text-xl'>
                                        <ReactDatePicker locale={it} showTimeSelect dateFormat='Pp' timeFormat="HH:mm" timeIntervals={15} className='cursor-pointer' calendarClassName="custom-calendar" minDate={new Date()} selected={instVetri} onChange={(date: Date) => setInstVetriDate(date)} />
                                    </td>
                                    <td>
                                        <select value={IVres} onChange={e => setIVres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                            <option value="" disabled hidden >Seleziona responsabile</option>
                                            {workers.map((worker) => (<option key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>))}
                                        </select>
                                    </td>
                                    <td className={`${props.isEdit ? "hidden" : ""}`}>
                                        <NewOrderNote resetSwitch={resetSwitch} onNotesChange={handleNotesChange} title='Installazione vetri' activity='installazioneVetri' />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="md:text-xl">Imballaggio</td>
                                    <td className='md:text-xl'>
                                        <ReactDatePicker locale={it} showTimeSelect dateFormat='Pp' timeFormat="HH:mm" timeIntervals={15} className='cursor-pointer' calendarClassName="custom-calendar" minDate={new Date()} selected={imballaggioDate} onChange={(date: Date) => setImballaggioDate(date)} />
                                    </td>
                                    <td>
                                        <select value={IMres} onChange={e => setIMres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                            <option value="" disabled hidden >Seleziona responsabile</option>
                                            {workers.map((worker) => (<option key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>))}
                                        </select>
                                    </td>
                                    <td className={`${props.isEdit ? "hidden" : ""}`}>
                                        <NewOrderNote resetSwitch={resetSwitch} onNotesChange={handleNotesChange} title='Imballaggio' activity='imballaggio' />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="md:text-xl">Trasporto</td>
                                    <td className='md:text-xl'>
                                        <ReactDatePicker locale={it} showTimeSelect dateFormat='Pp' timeFormat="HH:mm" timeIntervals={15} className='cursor-pointer' calendarClassName="custom-calendar" minDate={new Date()} selected={transportDate} onChange={(date: Date) => setTransportDate(date)} />
                                    </td>
                                    <td>
                                        <select value={TRAres} onChange={e => setTRAres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                            <option value="" disabled hidden >Seleziona responsabile</option>
                                            {workers.map((worker) => (<option key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>))}
                                        </select>
                                    </td>
                                    <td className={`${props.isEdit ? "hidden" : ""}`}>
                                        <NewOrderNote resetSwitch={resetSwitch} onNotesChange={handleNotesChange} title='Trasporto' activity='trasporto' />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="md:text-xl">Consegna/Inst.</td>
                                    <td className='md:text-xl'>
                                        <ReactDatePicker locale={it} showTimeSelect dateFormat='Pp' timeFormat="HH:mm" timeIntervals={15} className='cursor-pointer' calendarClassName="custom-calendar" minDate={new Date()} selected={delivInstDate} onChange={(date: Date) => setDelivInstDate(date)} />
                                    </td>
                                    <td>
                                        <select value={DELres} onChange={e => setDELres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                            <option value="" disabled hidden >Seleziona responsabile</option>
                                            {workers.map((worker) => (<option key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>))}
                                        </select>
                                    </td>
                                    <td className={`${props.isEdit ? "hidden" : ""}`}>
                                        <NewOrderNote resetSwitch={resetSwitch} onNotesChange={handleNotesChange} title='Consegna/Inst.' activity='consegnaInstallazione' />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className=' md:hidden flex flex-col gap-4'>
                            <div className='border'>
                                <h2 className='text-center text-lg font-bold'>Ricezione alluminio</h2>
                                <table className=' table table-auto'>
                                    <tbody>
                                        <tr>
                                            <td>Scadenza</td>
                                            <td>
                                                <ReactDatePicker locale={it} showTimeSelect dateFormat='Pp' timeFormat="HH:mm" timeIntervals={15}
                                                    calendarClassName="custom-calendar"
                                                    minDate={new Date()}
                                                    selected={ricAllDate}
                                                    onChange={(date: Date) => setRicAllDate(date)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Responsabile</td>
                                            <td>
                                                <select value={RAres} onChange={e => setRAres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                                    <option disabled>Seleziona responsabile</option>
                                                    {workers.map((worker) => (<option key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>))}
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className='border'>
                                <h2 className='text-center text-lg font-bold'>Ricezione vetri</h2>
                                <table className=' table table-auto'>
                                    <tbody>
                                        <tr>
                                            <td>Scadenza</td>
                                            <td>
                                                <ReactDatePicker locale={it} showTimeSelect dateFormat='Pp' timeFormat="HH:mm" timeIntervals={15} calendarClassName="custom-calendar" minDate={new Date()} selected={ricVetDate} onChange={(date: Date) => setVetAllDate(date)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Responsabile</td>
                                            <td>
                                                <select value={RVres} onChange={e => setRVres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                                    <option disabled>Seleziona responsabile</option>
                                                    {workers.map((worker) => (<option key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>))}
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className='border'>
                                <h2 className='text-center text-lg font-bold'>Taglio</h2>
                                <table className=' table table-auto'>
                                    <tbody>
                                        <tr>
                                            <td>Scadenza</td>
                                            <td>
                                                <ReactDatePicker locale={it} showTimeSelect dateFormat='Pp' timeFormat="HH:mm" timeIntervals={15} calendarClassName="custom-calendar" minDate={new Date()} selected={taglioDate} onChange={(date: Date) => setTaglioDate(date)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Responsabile</td>
                                            <td>
                                                <select value={TAGRes} onChange={e => setTAGRes(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                                    <option disabled>Seleziona responsabile</option>
                                                    {workers.map((worker) => (<option key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>))}
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className='border'>
                                <h2 className='text-center text-lg font-bold'>Lavorazione</h2>
                                <table className=' table table-auto'>
                                    <tbody>
                                        <tr>
                                            <td>Scadenza</td>
                                            <td>
                                                <ReactDatePicker locale={it} showTimeSelect dateFormat='Pp' timeFormat="HH:mm" timeIntervals={15} calendarClassName="custom-calendar" minDate={new Date()} selected={lavorazioneDate} onChange={(date: Date) => setLavorazioneDate(date)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Responsabile</td>
                                            <td>
                                                <select value={LAVres} onChange={e => setLAVres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                                    <option disabled>Seleziona responsabile</option>
                                                    {workers.map((worker) => (<option key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>))}
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className='border'>
                                <h2 className='text-center text-lg font-bold'>Assemblaggio</h2>
                                <table className=' table table-auto'>
                                    <tbody>
                                        <tr>
                                            <td>Scadenza</td>
                                            <td>
                                                <ReactDatePicker locale={it} showTimeSelect dateFormat='Pp' timeFormat="HH:mm" timeIntervals={15} calendarClassName="custom-calendar" minDate={new Date()} selected={assemblaggioDate} onChange={(date: Date) => setAssemblaggioDate(date)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Responsabile</td>
                                            <td>
                                                <select value={ASSres} onChange={e => setASSres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                                    <option disabled>Seleziona responsabile</option>
                                                    {workers.map((worker) => (<option key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>))}
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className='border'>
                                <h2 className='text-center text-lg font-bold'>Installazione vetri</h2>
                                <table className=' table table-auto'>
                                    <tbody>
                                        <tr>
                                            <td>Scadenza</td>
                                            <td>
                                                <ReactDatePicker locale={it} showTimeSelect dateFormat='Pp' timeFormat="HH:mm" timeIntervals={15} calendarClassName="custom-calendar" minDate={new Date()} selected={instVetri} onChange={(date: Date) => setInstVetriDate(date)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Responsabile</td>
                                            <td>
                                                <select value={IVres} onChange={e => setIVres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                                    <option disabled>Seleziona responsabile</option>
                                                    {workers.map((worker) => (<option key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>))}
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className='border'>
                                <h2 className='text-center text-lg font-bold'>Imballaggio</h2>
                                <table className=' table table-auto'>
                                    <tbody>
                                        <tr>
                                            <td>Scadenza</td>
                                            <td>
                                                <ReactDatePicker locale={it} showTimeSelect dateFormat='Pp' timeFormat="HH:mm" timeIntervals={15} calendarClassName="custom-calendar" minDate={new Date()} selected={imballaggioDate} onChange={(date: Date) => setImballaggioDate(date)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Responsabile</td>
                                            <td>
                                                <select value={IMres} onChange={e => setIMres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                                    <option disabled>Seleziona responsabile</option>
                                                    {workers.map((worker) => (<option key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>))}
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className='border'>
                                <h2 className='text-center text-lg font-bold'>Trasporto</h2>
                                <table className=' table table-auto'>
                                    <tbody>
                                        <tr>
                                            <td>Scadenza</td>
                                            <td>
                                                <ReactDatePicker locale={it} showTimeSelect dateFormat='Pp' timeFormat="HH:mm" timeIntervals={15} calendarClassName="custom-calendar" minDate={new Date()} selected={transportDate} onChange={(date: Date) => setTransportDate(date)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Responsabile</td>
                                            <td>
                                                <select value={TRAres} onChange={e => setTRAres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                                    <option disabled>Seleziona responsabile</option>
                                                    {workers.map((worker) => (<option key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>))}
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className='border'>
                                <h2 className='text-center text-lg font-bold'>Consegna/Inst.</h2>
                                <table className=' table table-auto'>
                                    <tbody>
                                        <tr>
                                            <td>Scadenza</td>
                                            <td>
                                                <ReactDatePicker locale={it} showTimeSelect dateFormat='Pp' timeFormat="HH:mm" timeIntervals={15} calendarClassName="custom-calendar" minDate={new Date()} selected={delivInstDate} onChange={(date: Date) => setDelivInstDate(date)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Responsabile</td>
                                            <td>
                                                <select value={DELres} onChange={e => setDELres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                                    <option disabled>Seleziona responsabile</option>
                                                    {workers.map((worker) => (<option key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>))}
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center md:justify-end my-4 mr-10 gap-4'>
                    <p onClick={() => resetFields()} className='btn btn-warning btn-lg rounded-xl'>Azzera</p>
                    {
                        props.isEdit ? <button type='submit' className='btn btn-info btn-lg rounded-xl'>Modifica</button> :
                            <button type='submit' className='btn btn-success btn-lg rounded-xl'>Aggiungi</button>
                    }
                    {
                        props.isEdit ? <p className="btn btn-error btn-lg rounded-xl" onClick={() => {
                            const modalElement = document.getElementById('my_modal_1') as HTMLDialogElement;
                            if (modalElement) {
                                modalElement.showModal();
                            } else {
                                console.error('Modal element not found');
                            }
                        }}>Elimina</p> : null
                    }
                </div>
            </form>
        </div>
    )
}

export default AddOrderForm