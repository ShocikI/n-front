import { Label } from "@radix-ui/react-label"

import { User } from "@/app/data/User"

type Props = {
    userData?: User,
    joined?: String
}

export const UnmutableProfileSection = ({userData, joined}: Props) => {
    return (
        <section className="flex flex-col w-2/3 gap-2">
            { userData?.username &&
                <Label>
                    Username: <span>{userData?.username}</span>
                </Label>
            }
            { userData?.email &&
                <Label>
                    Email: <span>{userData?.email}</span>
                </Label>
            }
            { joined &&
                <Label>
                    Joined: <span>{joined}</span>
                </Label>
            }
        </section>
    )
}
