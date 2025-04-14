import { Links } from "./Links";

export interface User {
    username: string,
    email: string,
    description: string,
    date_joined: string,
    links: Links[],
    plus: number,
    minus: number,
    avatar: string
}