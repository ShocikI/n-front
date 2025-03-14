import { client } from "../data/client";
import { AllFilters } from "./AllFilters";
import { LogOutButton } from "./buttons/LogOutButton";
import { cookies } from "next/headers";

export const Header = async () => {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

    const whoIsLogged = await client.checkToken(cookieHeader);

    const prompt = `Hello, ${whoIsLogged}!`;
    
    const categories = await client.getCategories();

    return (
        <div className="flex flex-row">
            <p>{prompt}</p>
            <AllFilters categories={categories}/>
            <LogOutButton/>
        </div>
    );
}