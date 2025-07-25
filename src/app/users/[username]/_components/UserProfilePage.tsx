'use client'
import { useEffect, useState } from "react"
import { Label } from "@radix-ui/react-label";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { User } from "@/utils/interfaces";
import { client } from "@/utils/client";
import { UnmutableProfileSection } from "./sections/UnmutableProfileSection";
import { UpdateUserAvatarForm } from "./forms/UpdateUserAvatarForm";
import { UpdateUserDescriptionForm } from "./forms/UpdateUserDescriptionForm";
import { CreateUserLinkForm } from "./forms/CreateUserLinkForm";
import { ProfileLinksSection } from "./sections/ProfileLinksSection";
import { AvatarComponent } from "./components/AvatarComponent";

export const UserProfilePage = () => {
    const router = useRouter();
    const { username } = useParams();
    const [ userData, setUserData ] = useState<User>();
    const [ ownerLogged, setOwnerLogged ] = useState(false)
    const [ joined, setJoined ] = useState("");
    const [ reloadFlag, setReloadFlag ] = useState(false)

    useEffect(() => {
        const getUserData = async () => {
            const responseToken = await client.checkToken();
            if (responseToken === username) 
                setOwnerLogged(true);

            const response = await client.getUserData(username?.toString());
            if (response.status === 200) {
                setUserData(response.data);
                if (response?.data?.date_joined) {
                    const date = new Date(response?.data?.date_joined);
                    
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let day = date.getDate();
                    
                    setJoined(`${day}.${month}.${year}`);
                }
            } else {
                router.push("/");
            }
        }

        getUserData();
    }, [reloadFlag]);

    const handleOnClick = () => {
        router.push(`/users/${username}/events`)
    }

    return (
        <main className="flex flex-col w-2/3 min-w-[510px] gap-4 ">
            <section className="flex flex-row gap-4 items-center mb-4">
                <AvatarComponent user={userData} />
                <UnmutableProfileSection userData={userData} joined={joined} />
            </section>
            
            { ownerLogged && 
                <UpdateUserAvatarForm 
                    username={userData?.username} 
                    flag={reloadFlag}
                    setFlag={setReloadFlag}
                />
            }
            { !!ownerLogged 
                ? 
                    <UpdateUserDescriptionForm 
                        username={userData?.username} 
                        description={userData?.description} 
                        flag={reloadFlag}
                        setFlag={setReloadFlag}    
                    />
                :
                    userData?.description &&
                    <div><Label>{userData?.description}</Label></div>
            }
            {
                ownerLogged && 
                <CreateUserLinkForm 
                    username={username?.toString()} 
                    flag={reloadFlag} 
                    setFlag={setReloadFlag}
                />
            }
            <ProfileLinksSection 
                username={username?.toString()} 
                flag={reloadFlag} 
                setFlag={setReloadFlag}
                isOwner={ownerLogged}
            />
            <Button className="w-fit" onClick={handleOnClick}>Go to {username} events</Button>
        </main>  
    )

}