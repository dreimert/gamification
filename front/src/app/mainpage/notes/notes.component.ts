import { Component } from "@angular/core";
import { notes_stu } from "./note_value";
import { HeaderComponent } from "../header/header.component";
import { Header } from "../header/header";
import { CommonModule } from "@angular/common";
import { Note } from "./note";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-notes",
    standalone: true,
    imports: [HeaderComponent, CommonModule, FormsModule],
    templateUrl: "./notes.component.html",
    styleUrl: "./notes.component.css",
})
export class NotesComponent {
    notes_stu = notes_stu;
    section: Header = {
        name: "Notes",
    };

    sessionSearch = '';
    filteredNote = this.notes_stu;
    searchSession():void {
        this.filteredNote = this.notes_stu.filter((note) =>
            note.name.toLowerCase().includes(this.sessionSearch.toLowerCase()),
        );
    }
}
