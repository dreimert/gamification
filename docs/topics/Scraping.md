# Scraping
## Objectifs du TP :
- Faire passer la notion de scrapping, usages.
- Faire manipuler des expressions régulières
- Notion de droits associés (RGPD, Respect des CGU, rate limit...)
- Faire des références à RPC et au client serveur (pas vraiment fait pour le moment)
- Transmettre la notion que l'informatique c'est de la manipulation d'information et que quelque-soit la forme, il y a des outils pour la manipuler
- Usages de la ligne de commande

## Scénario :
Modélisation sous la forme d'un escape game où l'élève doit modifier sa note de SYD pour pouvoir sortir en avance du TP/TD.
Il sera guidé par un 5TC qui a hacké l'accès au serveur et veut aider l'élève à sortir avec une bonne note. Malheureusement, il ne peut pas fouiller les pages web sans se faire repérer contrairement à l'étudiant.

L'élève disposera d'une fenêtre où entrer l'information cherchée pour vérification, ainsi qu'une fenêtre de code et d'un terminal.
Les informations cherchées seront différentes d'un étudiant à l'autre, pour éviter du partage inter-étudiants.

## Niveaux :
### Niveau 0 :
#### Objectif : {id="objectif_lvl0"}
Donner les outils de base du TP/TD.
#### Description : {id="description_lvl0"}
On donne des bouts de code aux élèves pour leur montrer comment faire des requêtes HTTP, des regex.
### Niveau 1 :
![]()
#### Objectif : {id="objectif_lvl1"}
Chercher à la main le username du prof sur une seule page Web
#### Description : {id="description_lvl1"}
On donne à l'étudiant une page Web qui contient les initiales des profs et l'username associé. Pas forcé d'automatiser le processus, on donne l'idée de base du scraping.
### Niveau 2 :
![]()
#### Objectif : {id="objectif_lvl2"}
Forcer l'automatisation du processus. L'élève doit chercher le code de la matière SYD (Nombre aléatoire) dans la base de données de TC.
#### Description : {id="description_lvl2"}
On donne à l'élève une page avec les 3 années de TC. Les noms des pages sont obfusqués. Sur la page de chaque année, on a les différentes UE (là encore obfusquées) qui donnent des liens vers les matières (sous la forme IP:4512789, NRP:1514522, SYD: 2554588).
Une fois le code trouvé, l'étudiant le donne au 5TC et passe à l'étape suivante.
### Niveau 3 :
![]()
#### Objectif : {id="objectif_lvl3"}
Passage à l'échelle
#### Description : {id="description_lvl3"}
L'élève va devoir chercher la correspondance entre le numéro de la matière dans la base de données du département et de celle de Planète. Il atterit sur une page contenant la liste des départements, puis pour chaque département les années et enfin la liste des matières avec la correspondance des codes. Tous les noms sont obfusqués pour éviter la recherche manuelle.
### Niveau 4 :
![]()
#### Objectif : {id="objectif_lvl4"}
Faire comprendre l'importance de RGPD
#### Description : {id="description_lvl4"}
L'élève est à la recherche des informations personnelles permettant de cracker le mot de passe du prof. Pour cela il a accès à une page avec la liste des profs (obfusqués) qui renvoie sur des pages avec les infos des profs. L'élève doit renvoyer le mail, le numéro de tel, le département, le nom du chien pour cracker le mot de passe. Une fois le mot de passe cracké, le 5TC lui propose un bouton pour modifier sa note et partir, mais en cliquant on affiche un Game Over avec le fait que la CNIL l'a attrapé en train de partager des données personnelles et qu'il ne respecte pas le RGPD et qu'il va donc en prison.
