'use client';

import { useState } from "react";
import { clsx } from "clsx";
import { client } from "@/app/data/client";
import { useRouter } from "next/navigation";


export const LoginForm = () => {
    const router = useRouter();
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ message, setMessage ] = useState('');

    const onChangeUsername = (e: any) => setUsername(e.target.value);
    const onChangePassword = (e: any) => setPassword(e.target.value);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const token = await client.logIn(username, password);

        if (token == null) {
            setMessage("User with this password doesn't exists.");
        } else {
            router.refresh();
        }
        setTimeout(() => { setMessage('') }, 10000);
    }

    return (
        <form className="flex flex-col" method="POST" onSubmit={handleSubmit}>
            <p className={clsx("w-full text-center mb-5 font-medium underline", !message && "hidden")}>{message}</p>
            <input className="input label p-2 my-2" 
                type="text" name="username" placeholder="Username" 
                onChange={onChangeUsername} required
            />
            <input className="input label p-2 my-2" 
                type="password" name="password" placeholder="Password" 
                onChange={onChangePassword} required
            />
            <input className="btn btn-primary p-2 my-2 font-extrabold" type="submit" value="Log in"/>
        </form>
    )
}