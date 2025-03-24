'use client'

import { useRouter } from "next/navigation";
import { client } from "@/app/data/client";

export const UserPanel = () => {
    const router = useRouter();    
    const buttonStyle = "m-2 p-2 underline font-medium hover:text-white hover:no-underline whitespace-nowrap";
    const id = 1;

    const moveToStart = () => router.replace("/");
    const moveToProfile = () => router.push(`/users/${id}/`);
    const moveToEvents = () => router.push(`/users/${id}/events/`);
    const moveToNewEvent = () => router.push("/events/newEvent/");
    const moveToSettings = () => router.push("/settings/");

    const handleLogOut = async () => {
        await client.logOut();
        router.refresh();
    }


    return <div className="flex flex-col flex-start justify-start items-start">
        <button className={buttonStyle} onClick={moveToStart}>Start</button>
        <button className={buttonStyle} onClick={moveToProfile}>Your profile</button>
        <button className={buttonStyle} onClick={moveToEvents}>Your events</button>
        <button className={buttonStyle} onClick={moveToNewEvent}>New event</button>
        <button className={buttonStyle} onClick={moveToSettings}>Settings</button>
        <button className={buttonStyle} onClick={handleLogOut}>Log out</button>
    </div>
}