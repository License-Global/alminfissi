'use client'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

type Props = {
    activity: string
    note?: string
    label: string
    id: string
}

const NoteModal = (props: Props) => {
    const [updatedData, setUpdatedData] = useState("");

    const notifySuccess = (text: string) => toast.success(text);
    const notifyError = (text: string) => toast.error(text);
    async function updateActivityNote(orderId: string, activityField: string, newNote: string) {
        try {
            const url = `${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/orders/${orderId}/${activityField}/note`;
            const data = { note: newNote };
            const response = await axios.patch(url, data);
            if (response.status >= 200 && response.status < 300) {
                notifySuccess("Nota inserita!");
            } else {
                notifyError("Errore nell'inserimento della nota.");
            }
        } catch (error) {
            // Gestisci gli errori
            console.error('Errore durante la richiesta PATCH:', error);
            notifyError("Errore durante la richiesta.");
        }
    }

    return (
        <div>{/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}
            <dialog id={`modal_${props.activity}_${props.id}`} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{"Inserire nota per: "}  <b>{" " + props.label}</b></h3>
                    <div className='flex'>
                        <input
                            type="text"
                            placeholder="Nota..."
                            className="input input-bordered w-full max-w-xs mt-2"
                            value={updatedData}
                            onChange={(e) => setUpdatedData(e.target.value)} />
                    </div>
                    {props.note && <p className='bg-slate-100 p-4 m-4 rounded-xl'><i>{props.note}</i></p>}
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-error rounded-lg mr-4">Annulla</button>
                            <button onClick={() => updateActivityNote(props.id, props.activity, updatedData)} className="btn btn-info rounded-lg">Conferma</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default NoteModal