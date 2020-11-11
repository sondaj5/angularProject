import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FundListComponent } from './fund-list/fund-list.component';
import { FundDetailsComponent } from './fund-details/fund-details.component';

const routes: Routes = [
  {
    path: 'funds/detail/:feed/:ticker',
    component: FundDetailsComponent,
  },
  {
    path: 'funds/all',
    component: FundListComponent,
  },
  {
    path: '**',
    redirectTo: 'funds/all',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
