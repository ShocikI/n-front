import { cookies } from "next/headers";
import { client } from "../../_utils/client"
import { SideBar } from "../../components/layout/sidebar/SideBar";


export const Layout = async ({ children }:any) => {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

    const isLogged = await client.checkToken(cookieHeader);

    return (
        <main className="w-screen h-screen bg-accent flex flex-row ">
            <SideBar user={isLogged}/>
            <div className="flex w-full items-start justify-evenly mt-10">
                {children}
            </div>
        </main>
    )
}