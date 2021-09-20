import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from './employees/employee-form/employee-form.component';
import { ViewEmployeeComponent } from './employees/view-employee/view-employee.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { NewEmployeeComponent } from './employees/new-employee/new-employee.component';
import { EmployeesComponent } from './employees/employees.component';
import { MaterialModule } from '../shared/material/material.module';
import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { WorkDialogComponent } from './employees/dialogs/work-dialog/work-dialog.component';
import { SupplementaryEducationDialogComponent } from './employees/dialogs/supplementary-education-dialog/supplementary-education-dialog.component';
import { ContactPersonDialogComponent } from './employees/dialogs/contact-person-dialog/contact-person-dialog.component';
import { FamilyDialogComponent } from './employees/dialogs/family-dialog/family-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    EmployeeFormComponent,
    ViewEmployeeComponent,
    EditEmployeeComponent,
    NewEmployeeComponent,
    EmployeesComponent,
    WorkDialogComponent,
    SupplementaryEducationDialogComponent,
    ContactPersonDialogComponent,
    FamilyDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    QuestionnaireRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [EmployeesComponent],
})
export class QuestionnaireModule { }
