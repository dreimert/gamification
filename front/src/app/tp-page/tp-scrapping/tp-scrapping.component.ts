import { Component, Input, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { NgxTypedJsModule } from "ngx-typed-js";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DialogHelpComponent } from "./dialog-help/dialog-help.component";
import { Session } from "../../models/session.model";
import { UserService } from "../../services/user.service";
import { PrivateUser } from "../../models/user.model";
import { TpScrappingService, lvl1Code, lvl2Course, lvl3Res, lvl4Res, verifyPassCode } from '../../services/tp-scrapping.service';
import { asapScheduler } from "rxjs";

@Component({
    selector: "app-tp-scrapping",
    standalone: true,
    imports: [CommonModule, NgxTypedJsModule, FormsModule, ReactiveFormsModule],
    templateUrl: "./tp-scrapping.component.html",
    styleUrl: "./tp-scrapping.component.css",
})
export class TpScrappingComponent implements OnInit {
    @Input() session!: Session | undefined;
    @Input() token!:string
    @Input() historyStudentLevel!:string;
    userName!:string;
    sentences: string[] = [];
    lvl!: number;
    passcodeList: any[] = [];
    passcode!: string;
    codeCorrect: boolean = false;
    codeEntered: boolean = false;
    date!: string | undefined;
    duree!: number;
    sentenceIndex: number = 0;
    initialTeacher!: { teacherInitials: string };

    constructor(
        private titleService: Title,
        public dialog: MatDialog,
        private userService: UserService,
        private tpService: TpScrappingService,
    ) {
        this.titleService.setTitle("Tp Scrapping");
    }

    ngOnInit(): void {
        this.getUserName();
        this.fetchLevel();
        this.getDate();
        this.getDuration();
        this.loadSentences();
        this.fetchPasscode();
    }

    getUserName(){
        this.userService.getCurrentUser().subscribe((user: PrivateUser) => {
            this.userName = user.name;
        });
    }

    getDate() {
        this.date = new Date(this.session!.startDate).toISOString().split("T")[0];
    }
    getDuration() {
        this.duree =
            (new Date(this.session!.endDate).getTime() - new Date(this.session!.startDate).getTime()) /
            (1000 * 60 * 60);
    }

    changeLevel() {
        this.lvl += 1;
        console.log("lvl: ", this.lvl);
    }
    fetchLevel() {
        this.lvl = parseInt(this.historyStudentLevel);
    }
    fetchPasscode() {
        // Service to get all passcode for all levels
        // this.passcodeList = ["start", "ablanc", "lvl2", "lvl3"];
        
        switch (this.lvl){
            case 1:
                this.tpService.getLvl1Code(this.token).subscribe((lvl1Code: lvl1Code)=>{
                    this.passcodeList.push(lvl1Code);
                })
                break;
            case 2:
                this.tpService.getLvl2Course(this.token).subscribe((lvl2Code: lvl2Course)=>{
                    this.passcodeList.push(lvl2Code);
                })
                break;
            case 3:
                this.tpService.getLvl3BookInfo(this.token).subscribe((lvl3Res: lvl3Res)=>{
                    this.passcodeList.push(lvl3Res);
                })
                break;
            case 4:
                this.tpService.getLvl4TeacherInfo(this.token).subscribe((lvl4Res: lvl4Res)=>{
                    this.passcodeList.push(lvl4Res);
                })
                break;
            default:
                this.passcodeList.push('start');

        }
        console.log(this.passcodeList)
    }


    verifyEnteredPasscode(currentLvl: number) {
        // ['start', 'ablanc', {}]
        this.codeEntered = true;
        // Service to valid passcode

        if (currentLvl == 0){
            if (this.codeCorrect = (this.passcode == 'start')){
                this.gotoNextLevel()
            };
        }else{
            // export interface codeLvl1{
            //     username:string
            // }
            
            // export interface codeLvl2{
            //     name:string,
            //     hours:number,
            //     ects:number,
            // }
            
            // export interface codeLvl3{
            //     title:string,
            //     isbn:number,
            // }
            
            // export interface codeLvl4{
            //     password:string,
            // }
            let code:any;
            switch (currentLvl){
                case 1:
                    code = {username:this.passcode}
                    break;
                case 2:
                    code = {
                        // name:string,
                        // hours:number,
                        // ects:number,
                    }
                    break;
                case 3:
                    code = {
                        // title:string,
                        // isbn:number,
                    }
                    break;
                case 4:
                    code = {password:this.passcode}
                    break;
            }
            this.tpService.verifyCode(this.token, code, this.lvl).subscribe((verifyPassCode: verifyPassCode)=>{
                if (this.codeCorrect = verifyPassCode.success){
                    this.gotoNextLevel();
                }
            });
        }
        
    }

    gotoNextLevel(){
        setTimeout(() => {
            this.sentenceIndex = 0;
            this.changeLevel();
            this.fetchPasscode();
            this.loadSentences();
            this.codeEntered = false;
            this.codeCorrect = false;
            this.passcode = "";
        }, 1000);
    }


    stringToNumber(string: string): number {
        return parseInt(string);
    }

    showHelpDialog() {
        const dialogRef = this.dialog.open(DialogHelpComponent, {
            width: "60%",
            height: "70%",
        });
    }

    nextSentence() {
        this.sentenceIndex += 1;
    }

    loadSentences() {
        switch (this.lvl) {
            case 0:
                this.sentences = [
                    // `^1000Bienvenue dans le tp scrapping! Vous ne me connaissez peut-être pas, mais j'ai besoin de votre aide en ce moment.^100`,
                    // `^1000Je suis en train de me connecter au serveur principal de l'INSA. J'ai besoin que vous m'aidiez à trouver les informations pertinentes pour m'aider à faire quelque chose. Je suis sûr que tu seras intéressé : )^100`,
                    `^1000Pour vous aider, j'ai préparé un dossier contenant les informations dont vous avez besoin.^500
        Appuyer sur <span class="text-yellow-200">'help'</span> pour plus d'informations.
        Tapez <span class="text-yellow-200">\'start\'</span> et appuyez <span class="text-yellow-200">\'Entrer\'</span> pour continuer^100`,
                ];
                break;
            case 1:
                this.sentences = [
                    `^1000C'est parti !^100`,
                    `^1000Je me connecte au système en tant que <span class="text-yellow-200">M. ABC</span>, mais je dois entrer son nom d'utilisateur. Pouvez-vous m'aider?^100
        <span class="text-yellow-200">liste des enseignants:</span> <a class="text-blue-200" href="http://xxxxxxxxxxxx" target="_blank">http://xxxxxxxxxxxx</a>
        Entrer le nom de l'utilisateur : >`,
                ];
                break;
            case 2:
                this.sentences = [
                    `^1000Attend..... mais quoi.....?`,
                    `^1000Normalement, je devrais pouvoir accéder à la liste des cours avec les 3 années du département TC , mais il semble que toutes les années et tous les noms de cours sont chiffrés !`,
                    `^1000Je compte sur vous maintenant ! Ce que je sais, c'est que cette page présente trois années de departement (3TC, 4TC et 5TC). A l'intérieur de chaque lien se trouvent les cours correspondant. Chaque cours a son propre numéro d'identification.`,
                    `^1000Pouvez-vous m'aider à trouver le code de cours <span class="text-yellow-200">4TC-SYD</span> s'il vous plaît ?^100
        <span class="text-yellow-200">liste des cours du département TC:</span> <a class="text-blue-200" href="http://xxxxxxxxxxxx" target="_blank">http://xxxxxxxxxxxx</a>
        Entrez le nom, le nombre d'heure et le nombre de crédit du cours  : >`,
                ];
                break;
            case 3:
                this.sentences = [
                    `^1000Je vais vous dire, je vais aller sur planete et faire changer mon score ! Tu devras garder le secret pour moi !`,
                    `^1000Accès à la base de données de planete.... Voila! C'est fait! Entrer le code de cours.....`,
                    `^1000"Vérification d'identité "??? "Parmi les livres suivants, lequel a la plus petite somme de numéros d'ISBM ?"`,
                    `^1000Dites-moi que ce n'est pas vrai!!!! Est-ce une question qu'une personne normale pourrait poser? Mais bon, ici, c’est l”INSA..... Si je comprends bien, il m'a donné une liste de livres, et chaque titre doit être suivi de son numéro ISBM (InternationalStandardBookNumber).Il faudrait additionner les chiffres de l'ISBM pour chaque livre et trouver le livre dont la somme est la plus petite.^100
        <span class="text-yellow-200">liste de livre : </span> <a class="text-blue-200" href="http://xxxxxxxxxxxx" target="_blank">http://xxxxxxxxxxxx</a>
        En cas d'égalité, on renvoie celui dont le titre est le premier dans l'ordre alphabétique. 
        Entrez le titre du livre : > `,
                ];
                break;
            case 4:
                this.sentences = [
                    `^1000C'est presque terminé !! J'avais anticipé cela. Saisir le code de confirmation. Pour autant que je sache, Il recueille les informations personnelles de quatre personnes. Ce code est constitué des <span class="text-yellow-200">initiales de la première personne + les 3 derniers chiffres du numéro de téléphone de la deuxième personne + lu jour de naissance de la troisième personne (2 chiffres) + le nom du chien de la quatrième personne </span>.`,
                    `^1000Le plus gros problème est que je ne sais pas qui sont ces quatre personnes ! Je ne connais que certaines de leurs données. Vous devrez utiliser ces informations pour trouver ces quatre personnes, et enfin le code de confirmation.`,
                    `^1000 N'abandonnez pas !! Je pourrai changer vos notes lorsque j'entrerai dans le système : D^100
        <span class="text-yellow-200">liste d’information personnelle des enseignants : </span> <a class="text-blue-200" href="http://xxxxxxxxxxxx" target="_blank">http://xxxxxxxxxxxx</a>
        En cas d'égalité, on renvoie celui dont le titre est le premier dans l'ordre alphabétique. 
        Entrez  le code de confirmation : >  `,
                ];
                break;
        }
    }
}



