import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { NgxTypedJsModule } from 'ngx-typed-js';

@Component({
  selector: 'app-tp-scrapping',
  standalone: true,
  imports: [CommonModule, NgxTypedJsModule],
  templateUrl: './tp-scrapping.component.html',
  styleUrl: './tp-scrapping.component.css'
})
export class TpScrappingComponent implements OnInit {
    sentences: string[] = [];
    lvl!: number;
    constructor(
        private titleService: Title,
        public dialog: MatDialog,
    ) {
        this.titleService.setTitle("Tp Scrapping");
    }
    ngOnInit(): void {
        this.fetchLevel();
        this.loadSentences(); 
    }

    changeLevel() {
        this.lvl += 1;
    }
    fetchLevel() {
        this.lvl = 0;
    }
    startLvl1() {
        this.lvl = 1;
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
        Tapez <span class="text-yellow-200">\'Enter\'</span> pour continuer...`
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
