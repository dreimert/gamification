import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { timer } from 'rxjs';

@Component({
  selector: 'app-tp-scrapping',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tp-scrapping.component.html',
  styleUrl: './tp-scrapping.component.css'
})
export class TpScrappingComponent implements OnInit {
    lvls: string[] = ['lvl1', 'lvl1', 'lvl2'];
    lvl!:number
    studentName: string='ghoti';
    passcodeList!:string[];
    passcode!:string;
    codeCorrect:boolean = false;
    codeEntered:boolean = false;

    constructor(
        private titleService: Title,
        public dialog: MatDialog,
    ) {
        this.titleService.setTitle("Tp Scrapping");
    }
    
    ngOnInit(): void {
        this.fetchLevel();
        this.fetchPasscode();
    }


    changeLevel() {
        this.lvl += 1;
    }
    fetchLevel() {
        // Service to get last level of student
        this.lvl = 0;
    }
    fetchPasscode(){
        // Service to get all passcode for all levels
        this.passcodeList = ['lvl0', 'lvl1', 'lvl2', 'lvl3']
    }

    getEnteredPasscode(lvl:number){
        this.codeEntered = true;
        // Service to valid passcode
        if (this.passcode==this.passcodeList[lvl]){
            this.codeCorrect = true;
            timer(1000).subscribe(() => {
                this.changeLevel();
                this.codeEntered = false;
                this.codeCorrect = false;
                this.passcode = '';
            });
        }
    }
    stringToNumber(string:string): number{
        return parseInt(string);
    }

    showHelpDialog(){
        // const dialogRef = this.dialog.open(JoinComponent, {
        //     width: "60%",
        //     height: "70%",
        // });
    }
}
