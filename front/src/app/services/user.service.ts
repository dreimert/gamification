import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { PrivateUser, User } from "../models/user.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class UserService {
    public root: string = environment.backendUrl + "/api/user/";
    private http: HttpClient;
    private user: PrivateUser;

    constructor(http: HttpClient) {
        this.http = http;
        this.user = new PrivateUser("", "", "", "", "", "");
    }

    public getCurrentUser(): Observable<PrivateUser> {
        if (this.user.id != "") {
            return new Observable<PrivateUser>((subscriber) => {
                subscriber.next(this.user);
            });
        } else {
            return new Observable<PrivateUser>((subscriber) => {
                this.http.get<PrivateUser>(this.root + "me").subscribe({
                    next: (user: PrivateUser) => {
                        subscriber.next(user);
                        this.user = user;
                    },
                    error: (error) => {
                        // todo: move this to a global error handler (http interceptor)
                        if (error.status == 401 && error.error.redirectURL) {
                            // redirect to login page
                            window.location.href = error.error.redirectURL;
                        }
                    },
                });
            });
        }
    }

    public logout(): Observable<unknown> {
        return new Observable<unknown>((subscriber) => {
            this.http.get<unknown>(environment.backendUrl + "/logout").subscribe({
                next: (res: unknown) => {
                    subscriber.next(res);
                },
                error: (err: Error) => {
                    console.log(err);
                    subscriber.error(err);
                },
                complete: () => {
                    this.user = new PrivateUser("", "", "", "", "", "");
                },
            });
        });
    }

    public login(username: string, password: string): Observable<PrivateUser> {
        return new Observable<PrivateUser>((subscriber) => {
            this.http
                .post<PrivateUser>(environment.backendUrl + "/login", {
                    username: username,
                    password: password,
                })
                .subscribe((user: PrivateUser) => {
                    subscriber.next(user);
                    this.user = user;
                });
        });
    }

    public getBatch(userIds: string[]): Observable<User[]> {
        return new Observable<User[]>((subscriber) => {
            this.http.post<User[]>(this.root + "batch", { users: userIds }).subscribe((users: User[]) => {
                subscriber.next(users);
            });
        });
    }

    public getOne(userId: string): Observable<User> {
        return new Observable<User>((subscriber) => {
            this.http.get<User>(this.root + userId).subscribe((user: User) => {
                subscriber.next(user);
            });
        });
    }
}
