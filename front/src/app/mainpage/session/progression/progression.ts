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
    {
        id: 5,
        name: "student 5",
        level: "2",
    },
    {
        id: 6,
        name: "student 6",
        level: "2",
    },
    {
        id: 7,
        name: "student 7",
        level: "2",
    },
    {
        id: 8,
        name: "student 8",
        level: "2",
    },
    {
        id: 9,
        name: "student 9",
        level: "2",
    },
    {
        id: 10,
        name: "student 10",
        level: "2",
    },
    {
        id: 11,
        name: "student 11",
        level: "2",
    },
    {
        id: 12,
        name: "student 12",
        level: "2",
    },
    {
        id: 13,
        name: "student 13",
        level: "2",
    },
    {
        id: 14,
        name: "student 14",
        level: "2",
    },
    {
        id: 15,
        name: "student 15",
        level: "2",
    },
    {
        id: 16,
        name: "student 16",
        level: "2",
    },
    {
        id: 17,
        name: "student 17",
        level: "2",
    },
    {
        id: 18,
        name: "student 18",
        level: "2",
    },
    {
        id: 19,
        name: "student 19",
        level: "2",
    },
    {
        id: 20,
        name: "student 20",
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
