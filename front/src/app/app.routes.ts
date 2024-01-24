import { Routes } from "@angular/router";
import { AccueilComponent } from "./mainpage/accueil/accueil.component";
import { GradeComponent } from "./mainpage/grade/grade.component";
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
import { LoginComponent } from "./login/login.component";
import { AdminGuard, AuthGuard, NoAuthGuard, TeacherGuard } from "./login/authguard.guard";
import { RegisterComponent } from "./register/register.component";

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
        title: "Login",
        canActivate: [NoAuthGuard],
    },
    {
        path: "register",
        component: RegisterComponent,
        title: "Register",
        canActivate: [NoAuthGuard],
    },
    {
        path: "session",
        component: SessionComponent,
        title: "Sessions",
        canActivate: [AuthGuard],
    },
    {
        path: "session/create",
        component: SessionCreateComponent,
        title: "Session",
        canActivate: [AuthGuard, TeacherGuard],
    },
    {
        path: "session/:id/progressions",
        component: ProgressionComponent,
        title: "Progressions",
        canActivate: [AuthGuard, TeacherGuard],
    },
    {
        path: "session/:id/progressions/edit",
        component: EditProgressionComponent,
        title: "Edit Progressions",
        canActivate: [AuthGuard, TeacherGuard],
    },
    {
        path: "session/:id/editSession",
        component: EditSessionComponent,
        title: "Edit Session",
        canActivate: [AuthGuard, TeacherGuard],
    },
    {
        path: "grade",
        component: GradeComponent,
        title: "Notes",
        canActivate: [AuthGuard],
    },
    {
        path: "grade-teacher",
        component: GradeTeacherComponent,
        title: "Notes",
        canActivate: [AuthGuard, TeacherGuard],
    },
    {
        path: "grade-teacher/:id/lookup",
        component: ListSessionGradeComponent,
        title: "Notes",
        canActivate: [AuthGuard, TeacherGuard],
    },
    {
        path: "grade-teacher/:id/lookup/edit",
        component: EditGradeComponent,
        title: "Notes",
        canActivate: [AuthGuard, TeacherGuard],
    },
    {
        path: "admin",
        component: AdminComponent,
        title: "Admin",
        canActivate: [AuthGuard, AdminGuard],
    },
    {
        path: "admin/modifyAccess",
        component: ModifyAccessComponent,
        title: "Modifier accès",
        canActivate: [AuthGuard, AdminGuard],
    },
    {
        path: "admin/addTeacher",
        component: AddTeacherComponent,
        title: "Ajouter un professeur",
        canActivate: [AuthGuard, AdminGuard],
    },
    {
        path: "home",
        component: AccueilComponent,
        title: "Home",
        canActivate: [AuthGuard],
    },
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full",
    },
    {
        path: "**",
        redirectTo: "/home",
    },
];
