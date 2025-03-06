//import { images } from "../assets/images";

export interface Puppy {
    id: number;
    name: string;
    gender: "male" | "female";
    color: "salt" | "black" | "black-silver";
    age: string;
    price: string;
    image: string;
}

export const availablePuppies: Puppy[] = [];

{
    /* 
    {
        id: 1,
        name: "Max",
        gender: "male",
        color: "salt",
        age: "12 weeks",
        price: "€2,500",
        image: images.puppy1,
    },
*/
}
