// export interface sentences {
//     lvl0: [string];
//     lvl1: [string];
//     lvl2: [string];
//     lvl3: [string];
//     lvl4: [string];
//     lvl5: [string];
//     lvl6: [string];
// }

import { environment } from "../../../environments/environment";

export const sentences = {
    'lvl0': [
        `^1000Bienvenue dans le tp scrapping! Vous ne me connaissez peut-être pas, mais j'ai besoin de votre aide en ce moment.^100`,
        `^1000Je suis en train de me connecter au serveur principal de l'INSA. J'ai besoin que vous m'aidiez à trouver les informations pertinentes pour m'aider à faire quelque chose. Je suis sûr que tu seras intéressé : )^100`,
        `^1000Pour vous aider, j'ai préparé un dossier contenant les informations dont vous avez besoin.^500
        Clicker sur le bouton <span class="text-yellow-200">'help'</span> pour plus d'informations.
        Tapez <span class="text-yellow-200">'start'</span> et appuyez <span class="text-yellow-200">'Enter'</span> pour continuer^100`,
    ],
    'lvl1': [
        `^1000C'est parti !^100`,
        `^1000Je me connecte au système en tant que <span class="text-yellow-200">#lvl1_info#</span>, mais je dois entrer son nom d'utilisateur. Pouvez-vous m'aider?^100
        <span class="text-yellow-200">liste des enseignants:</span> <a class="text-blue-200" href="${
            environment.backendUrl + "/api/scrapping"
        }/lvl1/scrap" target="_blank">${environment.backendUrl + "/api/scrapping"}/lvl1/scrap</a>
        Entrer le nom de l'utilisateur : >`,
    ],
    'lvl2': [
        `^1000Attend..... mais quoi.....?`,
        `^1000Normalement, je devrais pouvoir accéder à la liste des cours avec les 3 années du département TC , mais il semble que toutes les années et tous les noms de cours soient chiffrés !`,
        `^1000Je compte sur vous maintenant ! Ce que je sais, c'est que cette page présente trois années de departement (3TC, 4TC et 5TC). A l'intérieur de chaque lien se trouvent la liste des UEs qui contient elle-même la liste des cours. Chaque cours a son propre numéro d'identification.`,
        `^1000Pouvez-vous m'aider à trouver les informations du cours <span class="text-yellow-200">#lvl2_info#</span> s'il vous plaît ?^100
        <span class="text-yellow-200">liste des cours du département TC:</span> <a class="text-blue-200" href="${
            environment.backendUrl + "/api/scrapping"
        }/lvl2/scrap" target="_blank">${environment.backendUrl + "/api/scrapping"}/lvl2/scrap</a>
        Entrez le nom, le nombre d'heure et le nombre de crédit du cours (forme: nom,nombre d'heure,ECTS): >`,
    ],
    'lvl3': [
        `^1000Je vais vous dire, je vais aller sur planete et faire changer ma note ! Tu devras garder le secret pour moi !`,
        `^1000Accès à la base de données de planete.... Voila! C'est fait! Entrer le code de cours.....`,
        `^1000"Vérification d'identité "??? "Parmi les livres suivants, lequel a la plus petite somme de numéros d'ISBN ?"`,
        `^1000Dites-moi que ce n'est pas vrai!!!! Est-ce une question qu'une personne normale pourrait poser? Mais bon, ici, c'est l”INSA..... Si je comprends bien, il m'a donné une liste de livres, et chaque titre doit être suivi de son numéro ISBN (InternationalStandardBookNumber).Il faudrait additionner les chiffres de l'ISBN pour chaque livre et trouver le livre dont la somme est la plus petite.^100
<span class="text-yellow-200">liste de livre : </span> <a class="text-blue-200" href="${
environment.backendUrl + "/api/scrapping"
}/lvl3/scrap target="_blank">${environment.backendUrl + "/api/scrapping"}/lvl3/scrap</a>
En cas d'égalité, donnez celui dont le titre est le premier dans l'ordre alphabétique. 
Entrez le titre du livre et son code ISBN (forme: titre du livre,ISBN): > `,
    ],
    'lvl4': [
        `^1000C'est presque terminé !! J'avais anticipé cela. Saisir le code de confirmation. Pour autant que je sache, il demande les informations personnelles de quatre personnes. Ce code est constitué des <span class="text-yellow-200">initiales de la première personne + les 3 derniers chiffres du numéro de téléphone de la deuxième personne + le jour de naissance de la troisième personne (2 chiffres) + le nom du chien de la quatrième personne </span>.`,
        `^1000Le plus gros problème est que je ne sais pas qui sont ces quatre personnes ! Je ne connais que certaines de leurs données. Vous devrez utiliser ces informations pour trouver ces quatre personnes, et enfin le code de confirmation.`,
        `^1000 N'abandonnez pas !! Je pourrai changer vos notes lorsque j'entrerai dans le système : D^100
<span class="text-yellow-200">liste d'information personnelles des enseignants : </span> <a class="text-blue-200" href="${
environment.backendUrl + "/api/scrapping"
}/lvl4/scrap" target="_blank">${environment.backendUrl + "/api/scrapping"}/lvl4/scrap</a>
<span class="text-yellow-200">Attention! Le code de confirmation du système est mis à jour toutes les 5 minutes! (eg. 10h05, 10h10, 10h15) </span>
Entrez  le code de confirmation : >  `,
    ],
    'lvl6': [
        `<span class="text-red-500">Finalement, ce collègue de 5TC a été arrêté. Et il vous a dénoncé comme son complice.</span>`,
        `^1000Nous espérons que vous avez apprécié ce jeu !^500`,
        `^500Courage pour la suite !`,
    ]

};
export const infoToBeChanged = {
    'lvl0_info': "#lvl0_info#",
    'lvl1_info': "#lvl1_info#",
    'lvl2_info': "#lvl2_info#",
    'lvl3_info': "#lvl3_info#",
    // 'lvl4_info': "#lvl4_info#",
};

