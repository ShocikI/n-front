import { Label } from "@radix-ui/react-label"

import { User } from "@/app/data/interfaces"

type Props = {
    userData?: User,
    joined?: String
}

export const UnmutableProfileSection = ({userData, joined}: Props) => {
    const labelStyle = "w-fit";

    return (
        <section className="flex flex-col w-fit gap-2">
            { userData?.username &&
                <Label className={labelStyle}>
                    Username: <span>{userData?.username}</span>
                </Label>
            }
            { userData?.email &&
                <Label className={labelStyle}>
                    Email: <span>{userData?.email}</span>
                </Label>
            }
            { joined &&
                <Label className={labelStyle}>
                    Joined: <span>{joined}</span>
                </Label>
            }
        </section>
    )
}
