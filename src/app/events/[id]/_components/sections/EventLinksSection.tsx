import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok, faLinkedin, faXTwitter, faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import { Links } from "@/_utils/interfaces"
import { useEffect, useState } from "react";
import { client } from "@/_utils/client";

type Props = {
    id?: number,
    flag: boolean,
    setFlag: (flag: boolean) => void,
    isOwner: boolean,
    isEditPage?: boolean
}

const iconMap: Record<string, any> = {
    linkedin: faLinkedin,
    tiktok: faTiktok,
    x: faXTwitter,
    instagram: faInstagram,
    facebook: faFacebook,
    default: faLink
};

export const EventLinksSection = ({ id, flag, setFlag, isOwner, isEditPage }: Props) => {
    const [ links, setLinks ] = useState<Links[]>()

    useEffect(() => {
        const getLinks = async () => {
            const response = await client.getEventLinks(id);
            if (response.status == 200) 
                setLinks(response.data); 
        };

        if (flag === false) {
            getLinks();
        }
    }, [flag])

    const formatUrl = (url: string) => {
        return url.startsWith("http://") || url.startsWith("https://")
            ? url
            : `https://${url}`
    };

    const handleDelete = async (linkId: number) => {
        try {
            client.deleteEventLink(id, linkId);
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
                    {isOwner && isEditPage &&
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