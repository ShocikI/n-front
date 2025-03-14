'use client';

import { useRouter } from 'next/navigation';

import { client } from "../../data/client";


export const LogOutButton = () => {
    const router = useRouter();

    const handleClick = async () => {
        await client.logOut().then(() => router.replace(""));
    }

    return  <input className="btn btn-primary p-2 px-4 my-2 font-extrabold" 
                onClick={handleClick} type="submit" value="Log out"
            />
}