import { Routes } from "@angular/router";
import { AccueilComponent } from "./mainpage/accueil/accueil.component";
import { NotesComponent } from "./mainpage/notes/notes.component";
import { NoteProfComponent } from "./mainpage/note-prof/note-prof.component";
import { SessionComponent } from "./mainpage/session/session.component";
import { SessionCreateComponent } from "./mainpage/session/session-create/session-create.component";
import { AdminComponent } from "./mainpage/admin/admin.component";
import { ProgressionComponent } from "./mainpage/session/progression/progression.component";
import { EditProgressionComponent } from "./mainpage/session/progression/edit-progression/edit-progression.component";

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
        path: "note-prof",
        component: NoteProfComponent,
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
        title: "Session",
    },
    {
        path: "session/:id/progressions/edit",
        component: EditProgressionComponent,
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
