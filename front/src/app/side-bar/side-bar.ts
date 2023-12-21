import { SidebarButton } from "./sidebar-button/sidebarButton";

export const sidebars_stu: SidebarButton[] = [
    {
        id: 1,
        name: "Accueil",
        url: "/home",
        open: true,
    },
    {
        id: 2,
        name: "Notes",
        url: "/notes",
        open: false,
    },
    {
        id: 3,
        name: "Sessions",
        url: "/sessions",
        open: false,
    },
];

export const sidebars_prof = [
    {
        id: 1,
        name: "Accueil",
        url: "/home",
        open: true,
    },
    {
        id: 2,
        name: "Notes",
        url: "/grade-teacher",
        open: false,
    },
    {
        id: 3,
        name: "Sessions",
        url: "/sessions",
        open: false,
    },
    {
        id: 4,
        name: "Créer une session",
        url: "/session/create",
        open: false,
    },
];

export const sidebars_admin = [
    {
        id: 1,
        name: "Accueil",
        url: "/home",
        open: true,
    },
    {
        id: 2,
        name: "Notes",
        url: "/grade-teacher",
        open: false,
    },
    {
        id: 3,
        name: "Sessions",
        url: "/sessions",
        open: false,
    },
    {
        id: 4,
        name: "Créer une session",
        url: "/session/create",
        open: false,
    },
    {
        id: 4,
        name: "Admin",
        url: "/admin",
        open: false,
    },
];
