import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { StudentGrade, TeacherGrade } from "../models/grade.model";
import { User, UserType } from "../models/user.model";

@Injectable({
    providedIn: "root",
})
export class GradeService {
    private root: string;
    constructor(private http: HttpClient) {
        this.root = environment.backendUrl + "/api/grade/";
    }

    public getMyGrades(): Observable<StudentGrade[]> {
        return new Observable<StudentGrade[]>((subscriber) => {
            this.http.get<StudentGrade[]>(this.root + "my").subscribe({
                next: (grades: StudentGrade[]) => {
                    subscriber.next(grades);
                },
                error: (err) => {
                    console.log(err);
                    subscriber.error(err);
                },
            });
        });
    }

    public getGrades(sessionId: string): Observable<TeacherGrade[]> {
        return new Observable<TeacherGrade[]>((subscriber) => {
            this.http.get<TeacherGrade[]>(this.root + "all/" + sessionId).subscribe({
                next: (grades: TeacherGrade[]) => {
                    subscriber.next(grades);
                },
                error: (err) => {
                    console.log(err);
                    subscriber.error(err);
                },
            });
        });
    }

    public removeGradeOverride(progressionId: string): Observable<void> {
        return new Observable<void>((subscriber) => {
            this.http.post<void>(this.root + "resetGrade/" + progressionId, {}).subscribe({
                next: () => {
                    subscriber.next();
                },
                error: (err) => {
                    console.log(err);
                    subscriber.error(err);
                },
            });
        });
    }
    public setGradeOverride(progressionId: string, grade: OverrideGrade): Observable<void> {
        return new Observable<void>((subscriber) => {
            this.http.post<void>(this.root + "setGrade/" + progressionId, grade).subscribe({
                next: () => {
                    subscriber.next();
                },
                error: (err) => {
                    console.log(err);
                    subscriber.error(err);
                },
            });
        });
    }

    public setLevelGradeOverride(sessionId: string, level: OverrideLevel): Observable<TeacherGrade[]> {
        return new Observable<TeacherGrade[]>((subscriber) => {
            this.http.post<TeacherGrade[]>(this.root + "setLevelGrade/" + sessionId, level).subscribe({
                next: (nonModified) => {
                    subscriber.next(nonModified);
                },
                error: (err) => {
                    console.log(err);
                    subscriber.error(err);
                },
            });
        });
    }

    public removeLevelGradeOverride(sessionId: string): Observable<TeacherGrade[]> {
        return new Observable<TeacherGrade[]>((subscriber) => {
            this.http.post<TeacherGrade[]>(this.root + "removeLevelGrade/" + sessionId, {}).subscribe({
                next: (nonModified) => {
                    subscriber.next(nonModified);
                },
                error: (err) => {
                    console.log(err);
                    subscriber.error(err);
                },
            });
        });
    }

    public editStudentLevel(progressionID: string, level: number): Observable<void> {
        return new Observable<void>((subscriber) => {
            this.http.post<void>(this.root + "editStudentLevel/" + progressionID, { level: level }).subscribe({
                next: () => {
                    subscriber.next();
                },
                error: (err) => {
                    console.log(err);
                    subscriber.error(err);
                },
            });
        });
    }

    public getUserList(filter: string): Observable<User[]> {
        return new Observable<User[]>((subscriber) => {
            // Split the string into words
            const words = filter.split(" ");

            // Create a regex pattern for each word

            // Find users where either name or surname matches any of the regex patterns
            const users = userList.filter((user) => {
                const w = words.some((word) => user.name.includes(word) || user.surname.includes(word));
                return w;
            });
            subscriber.next(users);
            // Le code en dessous est une version qui devrait marcher avec le back
            // this.http.post<User[]>(this.root + "students/" + , { searchString: filter }).subscribe({
            //     next: (users: User[]) => {
            //         subscriber.next(users);
            //     },
            //     error: (err) => {
            //         console.log(err);
            //         subscriber.error(err);
            //     },
            // });
        });
    }
    public setBonus(user: User[], sessionId: string): Observable<void> {
        return new Observable<void>((subscriber) => {
            this.http.post<void>(this.root + "setBonus/" + sessionId, { usersWithBonus: user }).subscribe({
                next: () => {
                    subscriber.next();
                },
                error: (err) => {
                    console.log(err);
                    subscriber.error(err);
                },
            });
        });
    }
    //Soit utiliser cette fonction soit le rajouter dans modele grade
    public getBonus(gradeId: string): Observable<string[]> {
        return new Observable<string[]>((subscriber) => {
            subscriber.next(["abdel taya", "xinyi zhao"]);
            // this.http.get<string[]>(this.root + "getBonus/" + gradeId).subscribe({
            //     next: (bonus: string[]) => {
            //         subscriber.next(bonus);
            //     },
            //     error: (err) => {
            //         console.log(err);
            //         subscriber.error(err);
            //     },
            // });
        });
    }
}
const userList: User[] = [
    { id: "1", name: "abdel", surname: "taya", type: UserType.STUDENT },
    { id: "2", name: "xinyi", surname: "zhao", type: UserType.STUDENT },
    { id: "3", name: "chijin", surname: "gui", type: UserType.STUDENT },
    { id: "4", name: "valentin", surname: "lemaire", type: UserType.STUDENT },
];
export interface OverrideGrade {
    grade: number;
    comment: string;
}

export interface OverrideLevel {
    level: number;
    grade: number;
}
