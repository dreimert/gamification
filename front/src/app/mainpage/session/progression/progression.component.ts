import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink, ActivatedRoute, Router } from "@angular/router";
import { HeaderComponent } from "../../header/header.component";
import { Header } from "../../header/header";
import { progressions, levels } from "./progression";
import { SessionService } from "../../../services/session.service";
import { TeacherSession, Session } from "../../../models/session.model";

@Component({
    selector: "app-progression",
    standalone: true,
    imports: [HeaderComponent, CommonModule, FormsModule, RouterLink],
    templateUrl: "./progression.component.html",
    styleUrl: "./progression.component.css",
})
export class ProgressionComponent implements OnInit {
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

    StuName_search = "";

    progressions = [...progressions];
    levels = levels;

    getPercentage(level: string): string {
        if (level in levels) {
            return `Niveau ${level} (${levels[level]})`;
        } else {
            return `Il n'y a pas de niveau: ${level}`;
        }
    }

    gotoProgressEdit() {
        this.router.navigateByUrl(`/session/${this.session.id}/progressions/edit`, { state: this.session });
    }
}
