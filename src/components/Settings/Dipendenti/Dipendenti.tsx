'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaUserTimes } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {}

type Worker = {
    workerName: string;
    _id: number
};

const Dipendenti = (props: Props) => {
    const [workers, setWorkers] = useState<Worker[]>([])
    const [newWorker, setNewWorker] = useState("")
    const [updateGuardian, setUpadateGuardian] = useState<boolean>(false)
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
    }, [updateGuardian])

    const handleDelete = (workerId: number) => {
        axios.delete(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/personale/${workerId}`)
            .then(function (response) {
                if (response.status === 200) {
                    notifySuccess("Eliminato con successo")
                    setUpadateGuardian(!updateGuardian)
                } else notifyError("Errore!")
            })
            .catch(function (error) {
                console.log(error);
            });
        return;
    }

    const handleAddWorker = (newWorkerName: string) => {
        if (!newWorkerName) {
            notifyError("Nome assente")
            return
        } else {

            axios.post(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/personale`, {
                workerName: newWorkerName
            })
                .then(function (response) {
                    if (response.status === 201) {
                        notifySuccess("Agginuto con successo")
                        setUpadateGuardian(!updateGuardian)
                        setNewWorker("")
                    } else notifyError("Errore!")
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        return;
    }

    return (
        <>
            <ToastContainer autoClose={2000} pauseOnHover={false} />
            <div className='flex mt-2 mb-8 '>
                <dialog id="new_worker_modal" className="modal">
                    <div className="modal-box">
                        <p className="py-4">Inserire nome dipendente</p>
                        <input onChange={(e) => setNewWorker(e.target.value)} value={newWorker} type="text" placeholder="Nome dipendente" className="input input-bordered w-full max-w-xs" />
                        <div className="modal-action">
                            <form method="dialog">
                                <button onClick={() => handleAddWorker(newWorker)} className="btn mr-4 btn-success">Aggiungi</button>
                                <button className="btn">Annulla</button>
                            </form>
                        </div>
                    </div>
                </dialog>
                <button onClick={() => { (document.getElementById('new_worker_modal') as HTMLDialogElement | null)?.showModal(); }} className='btn btn-info rounded-xl'>
                    <div className='flex gap-2 items-center'>
                        <FaUserPlus size={30} />
                        <h2>Aggiungi</h2>
                    </div>
                </button>
            </div>
            <div className='grid grid-cols-2 gap-6'>
                {workers && workers.map((worker) =>
                    <div key={worker._id} className='flex gap-2 items-center text-center'>
                        <dialog id={'modal_dipendente' + worker._id} className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg"><b>Attenzione!</b></h3>
                                <p className="py-4">Sei sicuro di voler rimuovere <b><i>{worker.workerName}</i></b>?</p>
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button onClick={() => handleDelete(worker._id)} className="btn mr-4 btn-error">Rimuovi</button>
                                        <button className="btn">Annulla</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                        <div>
                            <table className='table'>
                                <tbody>
                                    <tr>
                                        <td className='border-2 w-60 text-lg font-semibold'>{worker.workerName}</td>
                                        <td onClick={() => { (document.getElementById('modal_dipendente' + worker._id) as HTMLDialogElement | null)?.showModal(); }} className='border-2 bg-slate-200 hover:bg-red-500 cursor-pointer transition-colors hover:text-white'>
                                            <FaUserTimes className='' size={30} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Dipendenti