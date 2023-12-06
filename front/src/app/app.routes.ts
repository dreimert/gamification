import { Routes } from '@angular/router';
import {AccueilComponent} from './mainpage/accueil/accueil.component';
import {NotesComponent} from './mainpage/notes/notes.component';
export const routes: Routes = [
      {
        path: 'notes',
        component: NotesComponent,
        title: 'Note',
      },
      {
        path: '',
        component: AccueilComponent,
        title: 'Home',
      },

];
