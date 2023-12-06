import { Routes } from '@angular/router';
import {AccueilComponent} from './mainpage/accueil/accueil.component';
import {NotesComponent} from './mainpage/notes/notes.component';
import {SessionComponent} from './mainpage/session/session.component';
export const routes: Routes = [
      {
        path: 'sessions',
        component: SessionComponent,
        title: 'Sessions',
      },
      {
        path: 'notes',
        component: NotesComponent,
        title: 'Notes',
      },
      {
        path: '',
        component: AccueilComponent,
        title: 'Home',
      },

];
