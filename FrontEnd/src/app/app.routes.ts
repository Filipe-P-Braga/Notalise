import { Routes } from '@angular/router';
import { Intro } from './pages/intro/intro';
import { Stand } from './pages/stand/stand';
import { Event } from './pages/event/event';
import { Comments } from './pages/comments/comments';

export const routes: Routes = [
  { path: '', component: Intro },
  { path: 'estande', component: Stand },
  { path: 'evento', component: Event },
  { path: 'comentarios', component: Comments },
  { path: '**', redirectTo: '' }
];
