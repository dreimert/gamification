import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { HeaderComponent } from "../../header/header.component";
import { Header } from "../../header/header";
import { SessionService } from "../../../services/session.service";
import { TeacherSession, Session } from "../../../models/session.model";
import { lists_notes, list_notes } from "./list_notes";

@Component({
    selector: "app-list-session-note",
    standalone: true,
    imports: [HeaderComponent, CommonModule, FormsModule, RouterLink],
    templateUrl: "./list-session-note.component.html",
    styleUrl: "./list-session-note.component.css",
})
export class ListSessionNoteComponent {
    session!: Session | TeacherSession;
    section!: Header;
    constructor(private sessionService: SessionService) {}

    ngOnInit(): void {
        const segments = window.location.href.split("/");
        const sessionId =
            decodeURIComponent(segments[segments.length - 2].replace(/%20/g, " ")) ||
            "URL does not have enough segments.";
        this.sessionService.getAllSessions().subscribe((sessions: Session[] | TeacherSession[]) => {
            const sessionInfo = sessions.find((s: Session | TeacherSession) => s.id == sessionId);
            if (sessionInfo) {
                this.session = sessionInfo;
            } else {
                console.log("name of session not found");
            }
            this.section = {
                name: `Notes/${this.session.name}`,
            };
        });
    }

    StuName = "";
    lists_notes = [...lists_notes];
}
