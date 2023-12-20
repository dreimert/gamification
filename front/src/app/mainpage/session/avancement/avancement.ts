export interface avancement {
    id: number;
    name: string;
    niveau: string;
}

export const avancements: avancement[] = [
    {
        id: 1,
        name: "studient 1",
        niveau: "3",
    },
    {
        id: 2,
        name: "studient 2",
        niveau: "1",
    },
    {
        id: 3,
        name: "studient 3",
        niveau: "4",
    },
    {
        id: 4,
        name: "studient 4",
        niveau: "2",
    },
];

export interface Niveaux {
    [key: string]: string;
}

export const niveaux: Niveaux = {
    "0": "0%",
    "1": "25%",
    "2": "50%",
    "3": "75%",
    "4": "100%",
};
