'use client'
import React, { useState } from 'react'
import { format } from 'date-fns';
import { it } from 'date-fns/locale'
import { IoIosMail } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



type Note = {
    content: string;
    date: Date;
    _id?: string;
};

type Props = {
    activity?: string;
    title: string;
    isArchived?: boolean;
    orderId?: string;
    notes: Note[];
    updateGuardian: React.Dispatch<React.SetStateAction<boolean>>;
};

const Note = (props: Props) => {
    const [nuovaNota, setNuovaNota] = useState("");
    const handleAggiungiNota = () => {
        if (nuovaNota) {
            axios.patch(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/${props.isArchived ? 'archive' : 'orders'}/${props.orderId}/${props.activity}/note`, {
                content: nuovaNota
            })
                .then(function (response) {
                    if (response.status === 200) {
                        setNuovaNota("")
                        props.updateGuardian(prevState => !prevState)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        return;
    }
    return (
        <div>
            <button onClick={() => (document.getElementById('note_modal' + props.orderId + props.activity) as HTMLDialogElement | null)?.showModal()}>{props.notes?.length > 0 ? <IoIosMail size={35} /> : <IoMailOutline size={35} />}</button>
            <dialog id={'note_modal' + props.orderId + props.activity} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4 border-b-2 pb-2">{props.title}</h3>
                    <p>{props.notes?.length <= 0 ? "Nessuna nota" : ""}</p>
                    <div className='border-b-2 pb-2'>
                        {props.notes && props.notes.map((nota, index) =>
                            <div key={nota._id} className={`chat ${index % 2 === 0 ? "chat-start" : "chat-end"}`}>
                                <div className="chat-header">
                                    <time className="text-xs opacity-50">
                                        {format(nota.date, "dd MMMM yyyy 'alle' HH:mm", { locale: it })}
                                    </time>
                                </div>
                                <div className="chat-bubble bg-slate-200 text-black font-semibold">{nota.content}</div>
                            </div>
                        )}
                    </div>
                    <div className='flex items-center mt-4 gap-2'>
                        <input onChange={(e) => setNuovaNota(e.target.value)} value={nuovaNota} type="text" placeholder="Nuova nota" className="input input-bordered w-full max-w-xs" />
                        <button onClick={() => handleAggiungiNota()} className='btn btn-success rounded-md'><FaCheck size={20} /></button>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Chiudi</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default Note