export interface progression {
    id: number;
    name: string;
    level: string;
}

export const progressions: progression[] = [
    {
        id: 1,
        name: "student 1",
        level: "3",
    },
    {
        id: 2,
        name: "student 2",
        level: "1",
    },
    {
        id: 3,
        name: "student 3",
        level: "4",
    },
    {
        id: 4,
        name: "student 4",
        level: "2",
    },
];

export interface Levels {
    [key: string]: string;
}

export const levels: Levels = {
    "0": "0%",
    "1": "25%",
    "2": "50%",
    "3": "75%",
    "4": "100%",
};
