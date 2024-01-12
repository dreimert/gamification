import { Routes } from "@angular/router";
import { AccueilComponent } from "./mainpage/accueil/accueil.component";
import { NotesComponent } from "./mainpage/notes/notes.component";
import { GradeTeacherComponent } from "./mainpage/grade-teacher/grade-teacher.component";
import { SessionComponent } from "./mainpage/session/session.component";
import { SessionCreateComponent } from "./mainpage/session/session-create/session-create.component";
import { AdminComponent } from "./mainpage/admin/admin.component";
import { ListSessionGradeComponent } from "./mainpage/grade-teacher/list-session-grade/list-session-grade.component";
import { EditGradeComponent } from "./mainpage/grade-teacher/list-session-grade/edit-grade/edit-grade.component";
import { ModifyAccessComponent } from "./mainpage/admin/modify-access/modify-access.component";
import { ProgressionComponent } from "./mainpage/session/progression/progression.component";
import { EditProgressionComponent } from "./mainpage/session/progression/edit-progression/edit-progression.component";
import { AddTeacherComponent } from "./mainpage/admin/add-teacher/add-teacher.component";
import { EditSessionComponent } from "./mainpage/session/edit-session/edit-session.component";

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
        path: "grade-teacher/:id/lookup/edit",
        component: EditGradeComponent,
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
        path: "session/:id/progressions",
        component: ProgressionComponent,
        title: "Progressions",
    },
    {
        path: "session/:id/progressions/edit",
        component: EditProgressionComponent,
        title: "Edit Progressions",
    },
    {
        path: "session/:id/editSession",
        component: EditSessionComponent,
        title: "Edit Session",
    },
    {
        path: "admin",
        component: AdminComponent,
        title: "Admin",
    },
    {
        path: "admin/modifyAccess",
        component: ModifyAccessComponent,
        title: "Modifier accès",
    },
    {
        path: "admin/addTeacher",
        component: AddTeacherComponent,
        title: "Modifier accès",
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
