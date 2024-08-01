'use client'
import React, { useState, useEffect } from 'react'
import { IoIosMail } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css';

type Props = {
    activity?: string;
    title: string;
    onNotesChange: (notes: { date: Date, content: string }[], activity?: string) => void;
    resetSwitch: boolean
};

const Note = (props: Props) => {
    const [nota, setNota] = useState("");
    const [notes, setNotes] = useState<{ date: Date, content: string }[]>([]);

    useEffect(() => {
        if (nota.trim() === "") {
            setNotes([]);
            props.onNotesChange([], props.activity);
        } else {
            const newNote = { date: new Date(), content: nota };
            setNotes([newNote]);
            props.onNotesChange([newNote], props.activity);
        }
    }, [nota]);

    useEffect(() => {
        setNota("");
        setNotes([])
    }, [props.resetSwitch])

    return (
        <div>
            <button onClick={() => (document.getElementById('note_modal_' + props.activity) as HTMLDialogElement | null)?.showModal()}>
                {notes.length > 0 ? <IoIosMail size={35} /> : <IoMailOutline size={35} />}
            </button>
            <dialog id={'note_modal_' + props.activity} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4 border-b-2 pb-2">{props.title}</h3>
                    <div className='flex items-center mt-4 gap-2'>
                        <input
                            onChange={(e) => setNota(e.target.value)}
                            value={nota}
                            type="text"
                            placeholder="Inserisci nota"
                            className="input input-bordered w-full max-w-xs"
                        />
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

export default Note;
