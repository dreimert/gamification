import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../header/header.component";
import { Header } from "../header/header";
import { SessionCardComponent } from "../session-card/session-card.component";

@Component({
    selector: "app-notes-teacher",
    standalone: true,
    imports: [CommonModule, HeaderComponent, SessionCardComponent],
    templateUrl: "./notes-teacher.component.html",
    styleUrl: "./notes-teacher.component.css",
})
export class NotesTeacherComponent {
    section: Header = {
        name: "Notes",
    };
}
