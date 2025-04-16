export interface Category {
    id: number;
    title: string;
  }

export interface LinkType {
    id: number,
    title: string
}

export interface Links {
    id: number,
    link_url: string,
    type: LinkType
}

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

export interface Owner {
    username: string,
    avatar: string
}

export interface Event {
    title: string;
    date: Date;
    address: string;
    location: string;
    description: string;
    price: number;
    avaliable_places: number;
    owner: Owner;
    category: Category;
    image: null | string;
  }