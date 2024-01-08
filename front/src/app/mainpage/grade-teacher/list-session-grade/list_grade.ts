export interface gradeStructure {
    id: number;
    name: string;
    grade: string;
    level: string;
}

export const listsGrade: gradeStructure[] = [
    {
        id: 1,
        name: "student 1",
        grade: "15",
        level: "4",
    },
    {
        id: 2,
        name: "student 2",
        grade: "12",
        level: "3",
    },
    {
        id: 3,
        name: "student 3",
        grade: "12",
        level: "3",
    },
    {
        id: 4,
        name: "student 4",
        grade: "10",
        level: "2",
    },
];

export interface Levels {
    [key: string]: string;
}

export const levels: Levels = {
    "0": "0",
    "1": "8",
    "2": "10",
    "3": "12",
    "4": "15",
};
