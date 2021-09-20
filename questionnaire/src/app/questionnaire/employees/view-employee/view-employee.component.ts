import { Component, Inject, Input, OnInit } from '@angular/core';
import { Employee } from '../../employee-models/employee-model/Employee';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CurrentDegree } from '../../../shared/enums/current-degree.enum';
import { FIRST_HEIGHER_TITLES } from '../../../shared/enums/first_heigher_title';
import { Yes_no_label } from '../../../shared/enums/yes_no_label';
import { FamilyRelation } from 'src/app/shared/enums/familyRelation.enum';
import { FULL_DATE_FORMAT } from 'src/app/shared/date/date.constans';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent  {

  @Input() employee: Employee;

  current: typeof CurrentDegree = CurrentDegree;
  TITLES = [] = FIRST_HEIGHER_TITLES;
  FamilyRelation: typeof FamilyRelation = FamilyRelation;
  yesNo: typeof Yes_no_label = Yes_no_label;
  FULL_DATE_FORMAT = FULL_DATE_FORMAT;

  constructor(private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private router: Router,
              private dialogRef: MatDialogRef<ViewEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) private data: Employee
  ) {
    this.employee = data;
  }

  getTitle(emp: Employee) {
    const title = this.TITLES.filter(ti => emp.firstHigherTitle === ti.value).map(ti => ti.label);
    return title;
  }

  onCloseWithoutChanges() {
    // this.router.navigate(['/dashboard/employees']);
    this.dialogRef.close();
  }

  goToEditEmployee() {
    this.onCloseWithoutChanges();

    this.router.navigate(['/dashboard/employees/edit', this.employee.key]);
  }

}
