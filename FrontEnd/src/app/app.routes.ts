import { Routes } from '@angular/router';
import { Intro } from './pages/intro/intro';
import { Stand } from './pages/stand/stand';
import { Event } from './pages/event/event';
import { EventCreate } from './pages/eventCreate/event';
import { CommentsPage } from './pages/comments/comments';
import { EStand } from './pages/editionStand/e-stand';

export const routes: Routes = [
  { path: '', component: Intro },
  { path: 'estande/:id', component: Stand },
  { path: 'editar-estande', component: EStand },
  { path: 'evento/:id', component: Event },
  { path: 'criar-evento', component: EventCreate },
  { path: 'comentarios', component: CommentsPage },
  { path: '**', redirectTo: '' }
];
