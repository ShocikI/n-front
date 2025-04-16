import axios from "axios";
import { Category, Event, User } from "./interfaces";

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

    getLinkTypes: async () => {
        try {
            const response = await axiosClient.get(`/api/link_types`);
            console.log(response.data);
            return response.data;
        } catch (e) {
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

    getUserData: async (username?: string) => {
        try {
            const response = await axiosClient.get(`/api/users/${username}`)
            return {
                data: response.data,
                status: response.status
            }
        } catch (e) {
            return {
                data: null,
                status: 404
            }
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

    checkToken: async (cookieHeader?: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login-check/`, {
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

    createNewEvent: async (
        title: string, date: string, category: number, address: string, location: { latitude: number, longitude: number },
        description?: string, price?: number, avaliablePlaces?: number, image?: string | File,
    ) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("date", date);
        formData.append("category", "" + category);
        formData.append("address", address);
        formData.append("location[latitude]", "" + location.latitude);
        formData.append("location[longitude]", "" + location.longitude);

        if (description) formData.append("description", description);
        if (price) formData.append("price", "" + price);
        if (avaliablePlaces) formData.append("avaliablePlaces", "" + avaliablePlaces);
        if (image) formData.append("image", image);

        var status;
        const axiosEvent = axios.create({
            baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
            withCredentials: true,
        });

        try {
            const response = await axiosEvent.post(`/api/events/`, formData)
            status = response.status
        } catch (e: any) {
            status = e.response.status;
        }

        return status;
    },

    changeUserAvatar: async (username?: string, avatar?: string | File) => {
        if (!username) throw new Error("Username is required");

        const formData = new FormData();
        if (avatar) formData.append("avatar", avatar);

        var status;
        const axiosEvent = axios.create({
            baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
            withCredentials: true,
        });

        try {
            const response = await axiosEvent.patch(`/api/users/${username}/`, formData)
            status = response.status
        } catch (e: any) {
            status = e.response.status;
        }

        return status;
    },

    changeUserDescription: async (username?: string, description?: string) => {
        if (!username) throw new Error("Username is required");

        const formData = new FormData();
        if (description) formData.append("description", description);

        var status;
        const axiosEvent = axios.create({
            baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
            withCredentials: true,
        });

        try {
            const response = await axiosEvent.patch(`/api/users/${username}/`, formData)
            status = response.status
        } catch (e: any) {
            status = e.response.status;
        }

        return status;
    },

    createUserLink: async (type: number, url: string) => {
        const formData = new FormData();
        formData.append("type_id", type.toString());
        formData.append("link_url", url)

        try {
            const response = await axiosClient.post(`/api/user_links/`, formData)
            return response.status
        } catch (e: any) {
            return e.response?.status || 500;
        }
    },

    getUserLinks: async (username?: string) => {
        try {
            const response = await axiosClient.get(`/api/users/${username}/user_links/`)
            return {
                data: response.data,
                status: response.status
            }
        } catch (e: any) {
            return {
                data: null,
                status: 404
            }
        }
    },

    deleteUserLink: async (id: number) => {
        try {
            await axiosClient.delete(`api/user_links/${id}/`);
        } catch (e: any) {
            console.error(e);
        }
    }


}