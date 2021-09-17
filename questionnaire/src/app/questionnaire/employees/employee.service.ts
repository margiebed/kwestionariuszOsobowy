import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireDatabase } from '@angular/fire/database';
import { Employee } from '../employee-models/employee-model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private API_URL = "/employees";

  constructor(private db: AngularFireDatabase) {
  }

  getEmployeesFromProjector(): Observable<Employee[]> {
    return this.db
    .list<Employee>(this.API_URL)
    .snapshotChanges()
    .pipe(map((response) => response.map((employee) => this.assignKey(employee))));
  }

  getEmployee(key: string): Observable<Employee>{
    return this.db.object<Employee>(`${this.API_URL}/${key}`).snapshotChanges()
    .pipe(map(em => this.assignKey(em)));
  }

  addEmployee(em: Employee) {
    return this.db.list<Employee>(this.API_URL).push(em);
  }

  editEmployee(key: string, em: Employee) {
    return this.db.object<Employee>(`${this.API_URL}/${key}`).update(em);
  }

  private assignKey(employee) {
    return {...employee.payload.val(), key: employee.key};
  }
}
