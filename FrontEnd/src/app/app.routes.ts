import { Routes } from '@angular/router';
import { Intro } from './pages/intro/intro';
import { Stand } from './pages/stand/stand';
import { Event } from './pages/event/event';
import { EventCreate } from './pages/eventCreate/event';
import { StandCreate } from './pages/standCreate/stand';
import { CommentsPage } from './pages/comments/comments';
import { EventList } from './pages/eventList/eventList';
import { EStand } from './pages/editionStand/e-stand';
import { LoginPage } from './pages/login/login';
import { StatisticsPage } from './pages/Statistics/statistics';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', component: Intro },
  { path: 'estande/:id', component: Stand },
  { path: 'editar-estande', component: EStand },
  { path: 'evento/:id', component: Event },
  { path: 'criar-evento', component: EventCreate },
  { path: 'criar-stand/:id', component: StandCreate },
  { path: 'comentarios', component: CommentsPage },
  { path: 'login', component: LoginPage },
  {
    path: 'estatisticas/:id',
    component: StatisticsPage,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['organizador'] }
  },
  { path: 'eventos', component: EventList },

  {
    path: 'criar-evento',
    component: EventCreate,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['suporte', 'organizador', 'usuario'] }
  },
  {
    path: 'editar-estande',
    component: EStand,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['suporte', 'organizador', 'expositor'] }
  },
  { path: '**', redirectTo: '' }
];
