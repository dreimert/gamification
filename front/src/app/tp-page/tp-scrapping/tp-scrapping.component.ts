import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { NgxTypedJsModule } from 'ngx-typed-js';
import { timer } from 'd3';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogHelpComponent } from './dialog-help/dialog-help.component';

@Component({
  selector: 'app-tp-scrapping',
  standalone: true,
  imports: [CommonModule, NgxTypedJsModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tp-scrapping.component.html',
  styleUrl: './tp-scrapping.component.css'
})
export class TpScrappingComponent implements OnInit{
    sentences: string[] = [];
    lvl!: number;
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
        this.loadSentences(); 
        this.fetchPasscode();

    }

    changeLevel() {
        this.lvl += 1;
        console.log('lvl: ', this.lvl)
    }
    fetchLevel() {
        this.lvl = 0;
    }
    // startLvl1() {
    //     this.lvl = 1;
    // }
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



    loadSentences() {
        switch (this.lvl) {
            case 0:
                this.sentences= [
`TP Scrapping (session name) [Date xxxx]<br>Duree 2h<br>
5TC:\\\Accueil> Bienvenue dans le tp scrapping! Vous ne me connaissez peut-être pas, mais j'ai besoin de votre aide en ce moment.
5TC:\\\Accueil> Je suis en train de me connecter au serveur principal de l'INSA. J'ai besoin que vous m'aidiez à trouver les informations pertinentes pour m'aider à ... faire quelque chose. Je suis sûr que tu seras intéressé : )
5TC:\\\Accueil> Pour vous aider, j'ai préparé un dossier contenant les informations dont vous avez besoin.
        Appuyer sur <span class="text-yellow-200">'help'</span> pour plus d'informations.
        Tapez <span class="text-yellow-200">\'start\'</span> pour continuer...`
          ];
                break;
            case 1:
                this.sentences= [
`5TC:\\\Niveau_1 > C'est parti !
5TC:\\\Niveau_1 > Je me connecte au système en tant que <span class="text-yellow-200">M. ABC</span>, mais je dois entrer son nom d'utilisateur. Pouvez-vous m'aider?
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
