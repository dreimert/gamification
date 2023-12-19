import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { JoinComponent } from "../session/join/join.component";
import { Header } from "../header/header";
import { Session, SessionStatus, TeacherSession } from "../../models/session.model";
import { RouterLink } from "@angular/router";
import { PrivateUser, UserType } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { SessionService } from "../../services/session.service";

@Component({
    selector: "app-session-card",
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: "./session-card.component.html",
    styleUrl: "./session-card.component.css",
})
export class SessionCardComponent implements OnInit {
    openDialog(session: Session): void {
        const dialogRef = this.dialog.open(JoinComponent, {
            width: "60%",
            height: "70%",
            data: session,
        });

        dialogRef.afterClosed().subscribe((password) => {
            if (password) {
                this.sessionService.joinSession(session, password).subscribe({
                    next: (session: Session) => {
                        // TODO: redirect to game page
                        alert("Vous avez rejoint la session" + session.name);
                    },
                    error: (err) => {
                        console.log(err);
                        alert("Impossible de rejoindre la session");
                    },
                });
            }
        });
    }

    constructor(
        public dialog: MatDialog,
        private userService: UserService,
        private sessionService: SessionService,
    ) {}

    ngOnInit() {
        this.userService.getCurrentUser().subscribe((user: PrivateUser) => {
            this.user = user;
        });
        if (this.Header.name == "Accueil") {
            this.sessionService.getAvailableSessions().subscribe((sessions: Session[] | TeacherSession[]) => {
                this.sessions = sessions;
            });
        } else if (this.Header.name == "Sessions" || this.Header.name == "Notes") {
            this.sessionService.getAllSessions().subscribe((sessions: Session[] | TeacherSession[]) => {
                this.sessions = sessions;
            });
        }
    }

    deleteSession(session: Session | TeacherSession) {
        this.sessionService.deleteSession(session).subscribe(() => {
            this.sessions = this.sessions.filter((s: Session | TeacherSession) => s.id != session.id);
        });
    }

    endSession(session: Session | TeacherSession) {
        this.sessionService.endSession(session).subscribe({
            next: () => {
                this.sessions = this.sessions.filter((s: Session | TeacherSession) => s.id != session.id);
            },
            error: () => {
                alert("Impossible de terminer la session");
            },
        });
    }

    calculateFontSize(textLength: number): string {
        const baseSize = 28;
        const minSize = 10;
        const scalingFactor = 0.5;

        const calculatedSize = baseSize - textLength * scalingFactor;

        return Math.max(calculatedSize, minSize) + "px";
    }

    sessions: Session[] | TeacherSession[] = [];
    @Input() Header!: Header;
    user!: PrivateUser;

    protected readonly SessionStatus = SessionStatus;
    protected readonly UserType = UserType;
}
