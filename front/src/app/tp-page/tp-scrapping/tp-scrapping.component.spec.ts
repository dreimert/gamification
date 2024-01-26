import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TpScrappingComponent } from "./tp-scrapping.component";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogRef } from "@angular/material/dialog";
import { PrivateUser, UserType } from "../../models/user.model";
import { SessionStatus } from "../../models/session.model";
import { TpScrappingService } from "../../services/tp-scrapping.service";
import { UserService } from "../../services/user.service";
import { lvl1Code, lvl2Course, lvl3Res, lvl4Res, verifyPassCode } from "../../services/tp-scrapping.service";
import { Observable, of } from "rxjs";

let tpScrappingService: Partial<TpScrappingService>;
let userServiceStub: Partial<UserService>;

describe("TpScrappingComponent", () => {
    let component: TpScrappingComponent;
    let fixture: ComponentFixture<TpScrappingComponent>;

    beforeEach(async () => {
        userServiceStub = {
            getCurrentUser(): Observable<PrivateUser> {
                return of<PrivateUser>({
                    id: "1",
                    username: "test",
                    email: "abc@test.com",
                    name: "test",
                    surname: "test",
                    type: UserType.STUDENT,
                });
            },
        };
        tpScrappingService = {
            getLvl1Code(): Observable<lvl1Code> {
                return of<lvl1Code>({
                    teacherName: "teacherName",
                });
            },
            getLvl2Course(): Observable<lvl2Course> {
                return of<lvl2Course>({
                    courseCode: "string",
                });
            },
            getLvl3BookInfo(): Observable<lvl3Res> {
                return of<lvl3Res>({});
            },
            getLvl4TeacherInfo(): Observable<lvl4Res> {
                return of<lvl4Res>({
                    p1Name: "string",
                    p2Initials: "string",
                    p3Phone: "string",
                    p4Mail: "string",
                });
            },
            verifyCode(): Observable<verifyPassCode> {
                return of<verifyPassCode>({
                    success: true,
                    progress: 1,
                });
            },
        };

        await TestBed.configureTestingModule({
            imports: [TpScrappingComponent, RouterTestingModule],
            providers: [
                {
                    provide: MatDialogRef,
                    useFactory: () => jasmine.createSpyObj("MatDialogRef", []),
                },
                { provide: TpScrappingService, useValue: tpScrappingService },
                { provide: UserService, useValue: userServiceStub },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TpScrappingComponent);
        component = fixture.componentInstance;
        component.session = {
            id: "",
            name: "Accueil",
            teachers: [],
            startDate: new Date(),
            endDate: new Date(),
            TP: "",
            status: SessionStatus.INPROGRESS,
            indexGrades: new Map<string, number>(),
            joined: true,
        };
        component.token = "";
        component.historyStudentLevel = "";
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
