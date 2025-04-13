import { Links } from "./Links";

export interface User {
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    description: string,
    date_joined: string,
    links: Links[],
    plus: number,
    minus: number,
    avatar: string
}