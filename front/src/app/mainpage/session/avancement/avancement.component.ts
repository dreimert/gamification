import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { HeaderComponent } from "../../header/header.component";
import { Header } from "../../header/header";
import { progressions, levels } from "./avancement";
import { SessionService } from "../../../services/session.service";
import { TeacherSession, Session } from "../../../models/session.model";

@Component({
    selector: "app-avancement",
    standalone: true,
    imports: [HeaderComponent, CommonModule, FormsModule, RouterLink],
    templateUrl: "./avancement.component.html",
    styleUrl: "./avancement.component.css",
})
export class AvancementComponent implements OnInit {
    session!: Session | TeacherSession;
    section: Header = { name: `Session//avancement` };
    sessionName = "";
    sessionId = "";
    constructor(private sessionService: SessionService) {}

    ngOnInit(): void {
        const segments = window.location.href.split("/");
        const sessionId =
            decodeURIComponent(segments[segments.length - 2].replace(/%20/g, " ")) ||
            "URL does not have enough segments.";
        this.sessionService.getAvailableSessions().subscribe((sessions: Session[] | TeacherSession[]) => {
            const sessionInfo = sessions.find((s: Session | TeacherSession) => s.id == sessionId);
            if (sessionInfo) {
                this.session = sessionInfo;
                this.sessionName = this.session.name;
                this.sessionId = this.session.id;
            } else {
                console.log("name of session not found");
            }
            this.section = {
                name: `Session/${this.sessionName}/avancement`,
            };
        });
    }

    StuName = "";

    progressions = [...progressions];
    levels = levels;

    getPercentage(level: string): string {
        if (level in levels) {
            return `Niveau ${level} (${levels[level]})`;
        } else {
            return `Il n'y a pas de niveau: ${level}`;
        }
    }
}
