import { Routes } from '@angular/router';
import {AccueilComponent} from './mainpage/accueil/accueil.component';
import {NotesComponent} from './mainpage/notes/notes.component';
import { SessionComponent } from './mainpage/session/session.component';
export const routes: Routes = [
      {
        path: 'notes',
        component: NotesComponent,
        title: 'Note',
      },
      {
        path: 'session',
        component: SessionComponent,
        title: 'Session',
      },
      {
        path: '',
        component: AccueilComponent,
        title: 'Home',
      },

];
