import { Component } from "@angular/core";
import { notes_stu } from "./note_value";
import { HeaderComponent } from "../header/header.component";
import { Header } from "../header/header";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-notes",
    standalone: true,
    imports: [HeaderComponent, CommonModule],
    templateUrl: "./notes.component.html",
    styleUrl: "./notes.component.css",
})
export class NotesComponent {
    notes_stu=notes_stu;
    max=notes_stu.length-1;
    section: Header = {
        name: "Notes",
    };
}
