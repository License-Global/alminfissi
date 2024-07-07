'use client'
import React, { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../../public/logo.webp'
import Image from 'next/image';
import axios from 'axios';


type Props = {}

const Login = (props: Props) => {
    const router = useRouter();
    const notify = (text: string) => toast.error(text);
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/users`, { role, password });
            const token = response?.data?.token;
            if (token) {
                localStorage.setItem('token', token);
            } else {
                notify('Login failed');
            }
            // Effettua il redirect o l'aggiornamento della UI a seconda del tuo flusso di navigazione
        } catch (error: any) {
            console.error('Login failed', error?.response.data.message);
            notify('Qualcosa è andato storto, riprova più tardi o controlla i dati')
        } finally {
            if (localStorage.getItem('token')) {
                router.push('/orders');
            }
        }
    };
    return (
        <div className="hero min-h-screen bg-slate-500">
            <ToastContainer limit={1} />
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-slate-200">
                    <Image src={logo} alt='logo' />
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Nome</span>
                            </label>
                            <input type="text" placeholder="Nome" className="input input-bordered" required onChange={(e) => setRole(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Password</span>
                            </label>
                            <input type="password" placeholder="Password" className="input input-bordered" required onChange={(e) => setPassword(e.target.value)} />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className="btn btn-primary">Accedi</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login