export class User {
    id: string;
    name: string;
    surname: string;
    type: UserType;

    constructor(id: string, name: string, surname: string, type: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.type = type as UserType;
    }
}

export class Teacher extends User {
    TPsAccessible: string[];

    constructor(id: string, name: string, surname: string, type: string, tpsAccessible:string[]){
        super(id, name, surname, type as UserType);
        this.TPsAccessible = tpsAccessible;
    }
}

export enum UserType {
    ADMIN = "admin",
    TEACHER = "teacher",
    STUDENT = "student",
}

export class PrivateUser extends User {
    username: string;
    email: string;

    constructor(id: string, name: string, surname: string, type: string, username: string, email: string) {
        super(id, name, surname, type);
        this.username = username;
        this.email = email;
    }
}
