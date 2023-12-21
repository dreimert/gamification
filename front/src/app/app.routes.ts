import { Routes } from "@angular/router";
import { AccueilComponent } from "./mainpage/accueil/accueil.component";
import { NotesComponent } from "./mainpage/notes/notes.component";
import { GradeTeacherComponent } from "./mainpage/grade-teacher/grade-teacher.component";
import { SessionComponent } from "./mainpage/session/session.component";
import { SessionCreateComponent } from "./mainpage/session/session-create/session-create.component";
import { AdminComponent } from "./mainpage/admin/admin.component";
import { ListSessionGradeComponent } from "./mainpage/grade-teacher/list-session-grade/list-session-grade.component";

export const routes: Routes = [
    {
        path: "sessions",
        component: SessionComponent,
        title: "Sessions",
    },
    {
        path: "notes",
        component: NotesComponent,
        title: "Notes",
    },
    {
        path: "grade-teacher",
        component: GradeTeacherComponent,
        title: "Notes",
    },
    {
        path: "grade-teacher/:id/lookup",
        component: ListSessionGradeComponent,
        title: "Notes",
    },
    {
        path: "session/create",
        component: SessionCreateComponent,
        title: "Session",
    },
    {
        path: "session/:id",
        component: SessionCreateComponent,
        title: "Session",
    },
    {
        path: "admin",
        component: AdminComponent,
        title: "Admin",
    },
    {
        path: "home",
        component: AccueilComponent,
        title: "Home",
    },
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full",
    },
];
