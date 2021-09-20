import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../employee-models/employee-model/employee.model';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit, AfterViewInit {

  @ViewChild('employeeFormValues', {static: false}) employeeFormValues: EmployeeFormComponent;
  employee: Employee;
  date = new Date();


  constructor(private route: ActivatedRoute,
              private  employeeService: EmployeeService,
              private router: Router,
              private snackBarService: MatSnackBar) {
  }

  ngOnInit(): void {
    // this.loadEmployee();
  }

  ngAfterViewInit() {
    this.loadEmployee()
  }

  private loadEmployee() {
    const key = this.route.snapshot.params['key'];
    console.log('key edit',key)
    this.employeeService.getEmployee(key)
    .pipe(tap(employee => {
      console.log('employe values w load 1', employee, this.employeeFormValues )
      this.employeeFormValues.setEmployee(employee)
      console.log('employe values w load 2',this.employeeFormValues )
    }))
    .subscribe(employee =>{
      this.employee = employee;
      console.log('w subscriberze', employee)
    } );
    console.log('employee w load', this.employee)
  }



  editEmployee(){
    console.log("values", this.employeeFormValues.employeeForm.value)
    // console.log("emp key1", this.key);
    // console.log("emp key", this.employee.key)
    if (this.employeeFormValues.employeeForm.invalid) {
      this.employeeFormValues.isClicked = true;
      this.employeeFormValues.employeeForm.markAllAsTouched();
      this.snackBarService.open('Wypełnij formularz ', '', {panelClass: 'snack-error'});
      return;
    }
    console.log('employee', this.employee)
    this.employeeService.editEmployee(this.employee.key, this.employeeFormValues.employeeForm.value)
    .then(this.onEditSuccess.bind(this), this.onFailure.bind(this));
  }

  private onEditSuccess() {
    this.router.navigate(['/dashboard/']);
    this.snackBarService.open('Zostało pomyślnie zapisane', '', {panelClass: 'toast-success'});
  }

  private onRemoveSuccess() {
    this.router.navigate(['/dashboard/']);
    this.snackBarService.open('Flight has been sucessfull removed', '', {panelClass: 'toast-success'});
  }
  private onFailure(error) {
    this.snackBarService.open(error.message, '', {panelClass: 'toast-error'});
  }
}
