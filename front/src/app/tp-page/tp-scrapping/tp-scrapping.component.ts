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
    text:string='5TC:\> Bienvenue dans le tp scrapping! Vous ne me connaissez peut-être pas, mais j\'ai besoin de votre aide en ce moment';
    textArray: string[] = [];

    constructor(
        private titleService: Title,
        public dialog: MatDialog,
    ) {
        this.titleService.setTitle("Tp Scrapping");
    }
    
    ngOnInit(): void {
        this.fetchLevel();
        
        this.textArray=this.text.split('');

        let timer = setInterval(()=>{
            let text = document.querySelector('p')?.innerHTML;
            text = this.textArray.pop()
        }, 100)

    }

    showtext(index:number): string {
        return index < this.textArray.length ? 'inline' : 'none';
    }


    changeLevel() {
        this.lvl += 1;
    }
    fetchLevel() {
        // Service to get last level of student
        this.lvl = 0;
    }
}
