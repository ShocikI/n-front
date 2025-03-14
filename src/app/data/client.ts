import axios from "axios";
import { Event } from "./Event";
import { Category } from "./Categories";

const axiosClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json', },
})


export const client = {
    getCategories: async () => {
        try {
            const response = await axiosClient.get<Category[]>(`/api/categories`);
            // console.log(response.data);
            return response.data;
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    },

    getEvents: async (point: string | null, radius: string | null, categoryIds: string[] | null): Promise<Event[]> => {
        let query = `/api/events/?point=${point}&radius=${radius}`;
        if (categoryIds) { query = `${query}&categoryIds=${categoryIds}` };
        try {
            const response = await axiosClient.get(query);
            // console.log(response.data);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    createUser: async (user: string, email: string, password: string) => {
        var status = 0;
        try {
            const response = await axiosClient.post('/api/users/', {
                "username": user,
                "email": email,
                "password": password
            });
            status = response.status
        } catch (e: any) {
            status = e.response.status;
        }

        return status;
    },

    logIn: async (username: string, password: string) => {
        try {
            const response = await axiosClient.post('/login/', {
                "username": username,
                "password": password
            });
            return response.data;
        } catch (e: any) {
            return null;
        }
    },

    logOut: async () => {
        try {
            const response = await axiosClient.post("/logout/");
            return response;
        } catch (e) {
            return false;
        }
    },

    getToken: (): string | null => {
        const cookies = document.cookie.split("; ");
        const tokenCookie = cookies.find(row => row.startsWith("token="));
        return tokenCookie ? tokenCookie.split("=")[1] : null;
    },

    checkToken: async (cookieHeader?: string) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/login-check/`, {
                method: "GET",
                cache: "no-store",
                credentials: "include",
                headers: cookieHeader ? { Cookie: cookieHeader } : {},
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const { user } = await response.json();

            return user;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    },

}