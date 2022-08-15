import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OtrfRequestsComponent } from './otrf-requests/otrf-requests.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'otrfrequests/:clientName', component: OtrfRequestsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
