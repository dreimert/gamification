import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { CreateSession, Session, TeacherSession } from "../models/session.model";
import { Observable, Subscriber } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class SessionService {
    private root: string;

    constructor(private http: HttpClient) {
        this.root = environment.backendUrl + "/api/session/";
    }

    public getAvailableSessions(): Observable<Session[] | TeacherSession[]> {
        return new Observable<Session[]>((subscriber) => {
            this.http
                .get<Session[] | TeacherSession[]>(this.root + "available")
                .subscribe((sessions: Session[] | TeacherSession[]) => {
                    sessions.sort((a: Session | TeacherSession, b: Session | TeacherSession) => {
                        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
                    });
                    sessions.map((session: Session | TeacherSession) => {
                        session.indexGrades = new Map<string, number>(session.indexGrades);
                    });
                    this.cast(sessions, subscriber);
                });
        });
    }

    public getAllSessions(): Observable<Session[] | TeacherSession[]> {
        return new Observable<Session[]>((subscriber) => {
            this.http.get<Session[]>(this.root + "all").subscribe((sessions: Session[] | TeacherSession[]) => {
                // order by status string, then by date
                sessions.sort((a: Session | TeacherSession, b: Session | TeacherSession) => {
                    const compare = Session.compareStatus(a, b);
                    if (compare == 0) {
                        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
                    }
                    return compare;
                });
                sessions.map((session: Session | TeacherSession) => {
                    session.indexGrades = new Map<string, number>(session.indexGrades);
                });
                this.cast(sessions, subscriber);
            });
        });
    }

    public newSession(session: CreateSession): Observable<TeacherSession> {
        return new Observable<TeacherSession>((subscriber) => {
            this.http.post<TeacherSession>(this.root + "new", session).subscribe({
                next: (session: TeacherSession) => {
                    subscriber.next(session);
                },
                error: (err) => {
                    console.log(err);
                    subscriber.error(err);
                },
            });
        });
    }

    public joinSession(session: Session, password: string): Observable<Session> {
        return new Observable<Session>((subscriber) => {
            this.http
                .post<Session>(this.root + session.id + "/join", {
                    id: session.id,
                    password,
                })
                .subscribe({
                    next: (data: Session) => {
                        subscriber.next(data);
                    },
                    error: (err) => {
                        console.log(err);
                        subscriber.error(err);
                    },
                });
        });
    }

    public deleteSession(session: Session | TeacherSession): Observable<unknown> {
        return new Observable<unknown>((subscriber) => {
            console.log(session.id);
            this.http.delete(this.root + session.id).subscribe({
                next: (data: unknown) => {
                    subscriber.next(data);
                },
                error: (err) => {
                    console.log(err);
                    subscriber.error(err);
                },
            });
        });
    }

    public endSession(session: Session | TeacherSession): Observable<unknown> {
        return new Observable<unknown>((subscriber) => {
            this.http.post(this.root + session.id + "/end", null).subscribe({
                next: (data: unknown) => {
                    subscriber.next(data);
                },
                error: (err) => {
                    console.log(err);
                    subscriber.error(err);
                },
            });
        });
    }

    private cast(sessions: Session[] | TeacherSession[], subscriber: Subscriber<Session[]>) {
        // differentiates between teacher and student sessions
        if (sessions.length > 0 && "students" in sessions[0]) {
            subscriber.next(sessions as TeacherSession[]);
        } else {
            subscriber.next(sessions as Session[]);
        }
    }
}

    getSession(id: string): Observable<Session | TeacherSession> {
        return new Observable<Session | TeacherSession>((subscriber) => {
            this.http.get<Session | TeacherSession>(this.root + id).subscribe({
                next: (session: Session | TeacherSession) => {
                    session.indexGrades = new Map<string, number>(session.indexGrades);
                    subscriber.next(session);
                },
                error: (err) => {
                    console.log(err);
                    subscriber.error(err);
                },
            });
        });
    }
}
