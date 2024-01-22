import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-tp-scrapping',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tp-scrapping.component.html',
  styleUrl: './tp-scrapping.component.css'
})
export class TpScrappingComponent implements OnInit {
    lvl!: number;
    constructor(
        private titleService: Title,
        public dialog: MatDialog,
    ) {
        this.titleService.setTitle("Tp Scrapping");
    }
    ngOnInit(): void {
        this.fetchLevel();
    }
    changeLevel() {
        this.lvl += 1;
    }
    fetchLevel() {
        // Service to get last level of student
        this.lvl = 0;
    }
}
