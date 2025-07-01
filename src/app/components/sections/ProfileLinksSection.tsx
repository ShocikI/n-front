import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok, faLinkedin, faXTwitter, faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import { Links } from "@/app/_data/interfaces"
import { useEffect, useState } from "react";
import { client } from "@/app/_data/client";

type Props = {
    username?: string,
    flag: boolean,
    setFlag: (flag: boolean) => void,
    isOwner: boolean,
}

const iconMap: Record<string, any> = {
    linkedin: faLinkedin,
    tiktok: faTiktok,
    x: faXTwitter,
    instagram: faInstagram,
    facebook: faFacebook,
    default: faLink
};

export const ProfileLinksSection = ({ username, flag, setFlag, isOwner }: Props) => {
    const [ links, setLinks ] = useState<Links[]>()

    useEffect(() => {
        const getLinks = async () => {
            const response = await client.getUserLinks(username);
            if (response.status == 200) 
                setLinks(response.data); 
        };

        getLinks();
    }, [flag])

    const formatUrl = (url: string) => {
        return url.startsWith("http://") || url.startsWith("https://")
            ? url
            : `https://${url}`
    }

    const handleDelete = async (linkId: number) => {
        try {
            client.deleteUserLink(linkId, username);
            setFlag(!flag);
        } catch (error: any) {
            console.error("Błąd podczas usuwania linku:", error);
        }
      };

    const listLinks = () => {
        return links?.map((link, index) => {
            const icon = iconMap[link.type.title.toLowerCase()] || iconMap.default;

            return (
                !!links &&
                <div key={index} className="flex items-center gap-2 py-2 ">
                    <FontAwesomeIcon icon={icon} className="text-xl text-gray-600 mr-2 size-8" />
                    <a href={formatUrl(link.link_url)} target="_blank" rel="noopener noreferrer" 
                        className="hover:underline"
                    >
                        {link.link_url}
                    </a>
                    {isOwner &&
                        <FontAwesomeIcon 
                            icon={faCircleXmark} 
                            className="text-xl text-red-600 ml-2 size-6"
                            onClick={() => handleDelete(link.id)}
                        />
                    }
                </div>
            )
        })
    }


    return (
        <section>
            { listLinks() }
        </section>
    )
}