export interface User {
    id: number;
    firstname: string;
    lastname: string;
    mail: string;
    student: boolean;
    admin: boolean;
}

export const userInfo: User = {
    id: 1234567,
    firstname: "abdel",
    lastname: "taya",
    mail: "abdel.taya@insa-lyon.fr",
    student: false,
    admin: true,
};
export const userInfo_stu: User = {
    id: 1111111,
    firstname: "xinyi",
    lastname: "zhao",
    mail: "xinyi.zhao@insa-lyon.fr",
    student: true,
    admin: false,
};

export const userInfo_prof: User = {
    id: 9999999,
    firstname: "david",
    lastname: "louis",
    mail: "david.louis@insa-lyon.fr",
    student: false,
    admin: false,
};
