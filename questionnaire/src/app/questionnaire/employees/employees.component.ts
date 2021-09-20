import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from './employee.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee-models/employee-model/employee.model';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpErrorResponse } from '@angular/common/http';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  constructor(private employeesService: EmployeeService, private router: Router, private dialog: MatDialog, private route: ActivatedRoute,) {
  }
  //
  employees: Employee[];
  employee: Employee;
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
  displayedColumns = [
    'login',
    'firstName',
    'lastName',
    'actions',
    'delete'
  ];

  employees$:Observable<Employee[]>=this.employeesService.getEmployeesFromProjector();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public pageSize = 25;
  public totalSize = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  ngOnInit(): void {
    this.employeesService.getEmployeesFromProjector().subscribe(data => {
        this.employees = data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalSize = this.employees.length;
      },
      (error: HttpErrorResponse) => {
        console.log(error.status);
      }
    );
  }

  showDetails(employee) {
    console.log("Employee jak idzie do view ", employee)
    this.dialog.open(ViewEmployeeComponent, {data: employee});
   // this.router.navigate(['/dashboard/employees/view/', employee.key]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addEmployee() {
    this.router.navigate(['/dashboard/employees/new/']);
  }
  goToEditEmployee(employee: Employee) {
    console.log("Employee jak idzie do edit ", employee)
    this.router.navigate(['/dashboard/employees/edit/', employee.key]);
  }

}
