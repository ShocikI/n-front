import { faCamera } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { User } from "@/utils/interfaces"

type Props = { user: User | undefined }

export const AvatarComponent = ({ user }: Props ) => {

    return (
        <div className="items-center">
            { !!user?.avatar 
                ? <img src={user?.avatar} className="h-[160px] rounded-xl"/> 
                : <FontAwesomeIcon icon={faCamera} className="text-xl p-4 text-gray-600 h-[80px]" />
            }
        </div> 
    )
}