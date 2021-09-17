import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth.guard';
import { LoginComponent } from './core/login/login.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "employees", pathMatch: "full" },
      { path: "employees", loadChildren: () => import('./questionnaire/questionnaire.module').then(m => m.QuestionnaireModule)},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
