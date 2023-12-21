import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, ActivatedRoute, Router } from "@angular/router";
import { HeaderComponent } from "../../header/header.component";
import { Header } from "../../header/header";
import { SessionService } from "../../../services/session.service";
import { TeacherSession, Session } from "../../../models/session.model";
import { lists_notes } from "./list_notes";

@Component({
    selector: "app-list-session-note",
    standalone: true,
    imports: [HeaderComponent, CommonModule, RouterLink],
    templateUrl: "./list-session-note.component.html",
    styleUrl: "./list-session-note.component.css",
})
export class ListSessionNoteComponent {
    session!: Session | TeacherSession;
    section: Header = { name: `Session//avancement` };
    sessionName = "";
    sessionId = "";

    constructor(
        private sessionService: SessionService,
        private router: Router,
        private activeRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.session = history.state;
        this.sessionName = this.session.name;
        this.sessionId = this.session.id;
        this.section = {
            name: `Session/${this.sessionName}/avancement`,
        };
    }

    StuName = "";
    lists_notes = [...lists_notes];
}
