# Ajouter un tp au front

## Structure des tps :
L'affichage d'un tp est géré par le tpPageComponent. Il s'ouvre lorsqu'un lien de type /tp/:id est utilisé.  
Lorsqu'un élève rejoint une session, le composant demande au backend les informations de la session avec l'id fourni dans l'url. Selon le type de TP de la session, il affiche le bon TP.


## Ajout dans le code :
***Pas besoin de rajouter une route pour accéder à un nouveau TP*** 
- Si ce  n'est pas déjà fait, ajouter un nouveau TP dans l'enum de TP dans session.js dans les modèles du back
- Créer un composant pour votre tp dans le front dans le dossier tp-page
- Importer ce tp dans tpPageComponent.ts
- Rajouter une condition ngIf correspondant à votre tp dans tpPageComponent.html 

*Lorsque vous ouvrez un tp du nouveau type, le composant crée doit maintenant s'afficher*

