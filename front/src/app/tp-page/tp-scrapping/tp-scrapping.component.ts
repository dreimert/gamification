import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { NgxTypedJsModule } from 'ngx-typed-js';
import { timer } from 'd3';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogHelpComponent } from './dialog-help/dialog-help.component';
import { Session } from '../../models/session.model';
import { TpScrappingService } from '../../services/tp-scrapping.service';

@Component({
  selector: 'app-tp-scrapping',
  standalone: true,
  imports: [CommonModule, NgxTypedJsModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tp-scrapping.component.html',
  styleUrl: './tp-scrapping.component.css'
})
export class TpScrappingComponent implements OnInit{
    @Input() session!: Session | undefined;
    sentences: string[] = [];
    lvl!: number;
    passcodeList!:string[];
    passcode!:string;
    codeCorrect:boolean = false;
    codeEntered:boolean = false;
    date!:string | undefined;
    sentenceIndex:number = 0;

    constructor(
        private titleService: Title,
        public dialog: MatDialog,
        // private tpService: TpScrappingService
    ) {
        this.titleService.setTitle("Tp Scrapping");
    }
    
    ngOnInit(): void {
        // const initialsTeacher = this.tpService.getInitialsTeacher();
        // console.log(initialsTeacher)
        this.fetchLevel();
        this.getDate();
        this.loadSentences(); 
        this.fetchPasscode();
    }

    getDate(){
        this.date = new Date(this.session!.startDate).toISOString().split('T')[0]
    }

    changeLevel() {
        this.lvl += 1;
        console.log('lvl: ', this.lvl)
    }
    fetchLevel() {
        this.lvl = 0;
    }
    fetchPasscode(){
        // Service to get all passcode for all levels
        this.passcodeList = [ 'start', 'lvl1', 'lvl2', 'lvl3']
    }

    getEnteredPasscode(currentLvl:number){
        this.codeEntered = true;
        // Service to valid passcode
        if (this.passcode==this.passcodeList[currentLvl]){
            this.codeCorrect = true;
            setTimeout(() => {
                this.sentenceIndex = 0;
                this.changeLevel();
                this.loadSentences();
                this.codeEntered = false;
                this.codeCorrect = false;
                this.passcode = '';
            }, 1000);
        }
    }
    stringToNumber(string:string): number{
        return parseInt(string);
    }

    showHelpDialog(){
        const dialogRef = this.dialog.open(DialogHelpComponent, {
            width: "60%",
            height: "70%",
        });
    }


    nextSentence(){
        this.sentenceIndex+=1;
    }

    loadSentences() {
        switch (this.lvl) {
            case 0:
                this.sentences= [

`^1000Bienvenue dans le tp scrapping! Vous ne me connaissez peut-être pas, mais j'ai besoin de votre aide en ce moment.^100`, 
`^1000Je suis en train de me connecter au serveur principal de l'INSA. J'ai besoin que vous m'aidiez à trouver les informations pertinentes pour m'aider à faire quelque chose. Je suis sûr que tu seras intéressé : )^100`, 
`^1000Pour vous aider, j'ai préparé un dossier contenant les informations dont vous avez besoin.^500
        Appuyer sur <span class="text-yellow-200">'help'</span> pour plus d'informations.
        Tapez <span class="text-yellow-200">\'start\'</span> pour continuer : `
          ];
                break;
            case 1:
                this.sentences= [
`^1000C'est parti !^100`, 
`^1000Je me connecte au système en tant que <span class="text-yellow-200">M. ABC</span>, mais je dois entrer son nom d'utilisateur. Pouvez-vous m'aider?^100
        <span class="text-yellow-200">liste des enseignants:</span> <span class="text-blue-200">http://xxxxxxxxxxxx</span>
        Entrer le nom de l'utilisateur : >`
                              ];
                break;
            default:
                this.sentences = ['默认句子数组', '默认句子数组的下一句', '...'];
                break;
        }
    }

}
