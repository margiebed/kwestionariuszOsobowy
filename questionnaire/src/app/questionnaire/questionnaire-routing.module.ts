import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewEmployeeComponent } from './employees/new-employee/new-employee.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { EmployeesComponent } from './employees/employees.component';
import { ViewEmployeeComponent } from './employees/view-employee/view-employee.component';

const empolyeeRoutes: Routes = [
  {
    path: '', component: EmployeesComponent,
  },
  {
    path: 'view/:key',

    component: ViewEmployeeComponent,

  },
  {
    path: 'edit/:key',
    component: EditEmployeeComponent,

    data: {isAdded: true}
  },
  {
    path: 'new',
    component: NewEmployeeComponent,
    data: {isAdded: false}
  }
];

@NgModule({
  imports: [RouterModule.forChild(empolyeeRoutes)],
  exports: [RouterModule]
})
export class QuestionnaireRoutingModule { }
