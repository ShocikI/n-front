'use client';

import { useState } from "react"
import clsx from "clsx";
import { client } from "@/app/data/client";

type Timer = ReturnType<typeof setTimeout>;

export const RegistrationForm = () => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ rePassword, setRePassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ message, setMessage ] = useState('');

    const onChangeUsername = (e: any) => setUsername(e.target.value);
    const onChangePassword = (e: any) => setPassword(e.target.value);
    const onChangeRePassword = (e: any) => setRePassword(e.target.value);
    const onChangeEmail = (e: any) => setEmail(e.target.value);

    const errorStyles = 'border-red-600 border-4'

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const status = await client.createUser(username, email, password);
        
        switch (status) {
            case 201:
                setMessage("User registered."); break;
            case 400:
                setMessage("User already exists!"); break;
            default:
                setMessage("Unpredicted error"); break;
            };
        
        setTimeout(() => { setMessage('') }, 10000);
    }

    return (
        <form className="flex flex-col" method="POST" onSubmit={handleSubmit}>
            <p className={clsx("w-full text-center mb-5 font-medium underline", !message && "hidden")}>{message}</p>
            <input className="input label p-2 my-2" 
                name="username" type="text" placeholder="Type username" required
                onChange={onChangeUsername} autoComplete="off"
            />
            <input className={clsx("input label p-2 my-2", email && !email.includes("@") && errorStyles)}
                name="email" type="text" placeholder="Type email" required
                onChange={onChangeEmail} autoComplete="off"
            />
            <input className="input label p-2 my-2" 
                name="password" type="password" placeholder="Type password" required
                onChange={onChangePassword} autoComplete="off"
            />
            <input className={clsx("input label p-2 my-2", password && password!=rePassword && errorStyles)}
                name="rePassword" type="password" placeholder="Retype password" required
                onChange={onChangeRePassword} autoComplete="off"
            />
            <input className="btn btn-primary p-2 my-2 font-extrabold" type="submit" value='Sign up'/>
        </form>
    )
}