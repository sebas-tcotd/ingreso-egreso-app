import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dahsboardRoutes } from './dashboard.routes';

const childRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dahsboardRoutes,
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutesModule {}
