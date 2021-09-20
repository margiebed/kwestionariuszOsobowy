import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { Employee } from '../../employee-models/employee-model/employee.model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {
  @ViewChild('employeeFormValues', {static: false}) employeeFormValues: EmployeeFormComponent;
  @Output() eventSubmit = new EventEmitter<boolean>();
  employee: Employee;
  date = new Date();
  private subscription: Subscription = new Subscription();

  constructor(private snackBarService: MatSnackBar, private router: Router, private employeeService:EmployeeService ) { }

  ngOnInit(): void {
  }

  saveEmployee() {
    console.log('Data 1', this.date);
    console.log('Data 2', this.employeeFormValues.employeeForm.get('updateDate') )
    if (this.employeeFormValues.employeeForm.invalid) {
      this.employeeFormValues.isClicked = true;
      this.employeeFormValues.employeeForm.markAllAsTouched();
      this.snackBarService.open('Wypełnij formularz ', '', {panelClass: 'snack-error'});
      return;
    }
    // if (this.employeeForm.valid) {
    //   this.employeeForm.get('updateDate').setValue(this.date);
    // }
    console.log('w add value', this.employeeFormValues.employeeForm.value);
    // const s = this.employeeService.saveEmployee(this.employeeFormValues.employeeForm.value).then(
    //   () => {
    //     console.log('employee key', this.employeeFormValues.employeeForm.get('key'))
    //     this.snackBarService.open('Zostało pomyślnie zapisane', '', {panelClass: 'snack-success'});
    //     this.router.navigate(['/dashboard/employees/']);
    //   },
    //   error => {
    //     this.snackBarService.open('Wypełnij wymagane pola.', error.message, {panelClass: 'snack-error'});
    //   }
    // );
    // this.subscription.add(s);
    this.employeeService.addEmployee(this.employeeFormValues.employeeForm.value)
    .then(this.onEditSuccess.bind(this), this.onFailure.bind(this));
  }
  private onEditSuccess() {
    this.router.navigate(['/dashboard/']);
    this.snackBarService.open('Zostało pomyślnie zapisane', '', {panelClass: 'toast-success'});
  }

  private onFailure(error) {
    this.snackBarService.open(error.message, '', {panelClass: 'toast-error'});
  }
}
