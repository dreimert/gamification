import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { observeNotification } from 'rxjs/internal/Notification';

@Injectable({
    providedIn: 'root'
})
export class TpScrappingService {
    private root: string;
    constructor(private http: HttpClient ) {
        this.root = environment.backendUrl + "/api/scrapping/";
    }

    public getInitialsTeacher():Observable<initialTeacher>{
        return new Observable<initialTeacher>((subscriber)=>{
            this.http
                .get<initialTeacher>(this.root + 'lvl1')
                .subscribe((teacherInitials)=>{
                    subscriber.next(teacherInitials)
                })
        })
    }

}

interface initialTeacher {"teacherInitials":string};
