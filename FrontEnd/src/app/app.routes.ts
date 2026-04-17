import { Routes } from '@angular/router';
import { Intro } from './pages/intro/intro';
import { Stand } from './pages/stand/stand';
import { Event } from './pages/event/event';
import { EventCreate } from './pages/eventCreate/event';
import { CommentsPage } from './pages/comments/comments';

export const routes: Routes = [
  { path: '', component: Intro },
  { path: 'estande', component: Stand },
  { path: 'evento', component: Event },
  { path: 'criar-evento', component: EventCreate },
  { path: 'comentarios', component: CommentsPage },
  { path: '**', redirectTo: '' }
];
