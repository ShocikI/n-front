'use client'
import { useState } from "react";
import { faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { UserPanel } from "./UserPanel";
import { LoginRegister } from "./LoginRegister";

type Props = { "user": string }

export const SideBar = ( {user}: Props ) => {
    const [isSideBar, setIsSideBar] = useState(false);

    const handleIsSideBar = () => setIsSideBar(!isSideBar);

    return (
    <div className="w-fit bg-white/20 p-4">
        <div className="flex flex-row justify-end">
            <button className=""
            onClick={handleIsSideBar} >
                <FontAwesomeIcon icon={isSideBar ? faArrowLeft: faArrowRight} 
                    className='size-6 mx-1 p-2 rounded-full bg-primary hover:text-white hover:bg-secondary'/>
            </button>
        </div>
        
        {isSideBar &&
        <div className="flex flex-col h-fit mt-4 items-center justify-evenly">
            {!!user ? 
            <div> 
                <UserPanel/>
            </div>
            : 
            <div>
                <LoginRegister/>
            </div>}
        </div>
        }
    </div>)
}

