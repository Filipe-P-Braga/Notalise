import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewEventComponent } from './components/new-event/new-event.component';
import { StandRegistrationComponent } from './components/stand-registration/stand-registration.component';

const routes: Routes = [
  { path: '', redirectTo: 'evento', pathMatch: 'full' },
  { path: 'evento', component: NewEventComponent },
  { path: 'stand', component: StandRegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
