import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CurrentDegree } from 'src/app/shared/enums/current-degree.enum';
import { FamilyRelation } from 'src/app/shared/enums/familyRelation.enum';
import { Employee } from '../../employee-models/employee-model/Employee';
import { FIRST_HEIGHER_TITLES } from '../../../shared/enums/first_heigher_title';
import { YES_NO, Yes_no_label } from '../../../shared/enums/yes_no_label';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../employee.service';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { SupplementaryEducationDialogComponent } from '../dialogs/supplementary-education-dialog/supplementary-education-dialog.component';
import { SupplementaryEducation } from '../../employee-models/supp/supplementary-education.model';
import { WorkDialogComponent } from '../dialogs/work-dialog/work-dialog.component';
import { FamilyDialogComponent } from '../dialogs/family-dialog/family-dialog.component';
import { Family } from '../../employee-models/family-model/family.model';
import { ContactPerson } from '../../employee-models/contact/contact-person.model';
import { Work } from '../../employee-models/work-model/work.model';
import moment from 'moment';
import { FULL_DATE_FORMAT } from 'src/app/shared/date/date.constans';
import { ContactPersonDialogComponent } from '../dialogs/contact-person-dialog/contact-person-dialog.component';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit, OnDestroy {

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private matDialog: MatDialog,
              private snackBarService: MatSnackBar,
              private employeeService: EmployeeService,
              private router: Router
  ) {
  }

  @Input() editMode = false;
  @Input() isClicked = false;

  employee: Employee;
  employeeForm: FormGroup;
  familyRows: FormArray;
  familyDataSource = new BehaviorSubject<AbstractControl[]>([]);
  suppliesRows: FormArray;
  suppliesDataSource = new BehaviorSubject<AbstractControl[]>([]);
  CurrentDegree: typeof CurrentDegree = CurrentDegree;
  currentDegrees: string[] = Object.keys(CurrentDegree);
  workRows: FormArray;
  worksDataSource = new BehaviorSubject<AbstractControl[]>([]);
  FamilyRelation: typeof FamilyRelation = FamilyRelation;
  yesNo: typeof Yes_no_label = Yes_no_label;
  contactPersonRows: FormArray;
  contactPersonDataSource = new BehaviorSubject<AbstractControl[]>([]);
  TITLES = FIRST_HEIGHER_TITLES;
  YES_NO = YES_NO;
  FULL_DATE_FORMAT = FULL_DATE_FORMAT;
  date = new Date();
  year = this.date.getFullYear();
  years = [];

  displayedFamilyColumns = ['nameFamily', 'dobFamily', 'relation', 'action'];
  displayedSupplementaryEduColumns = ['name', 'educationDate', 'during', 'action'];
  displayedWorkColumns = ['fromJob', 'toJob', 'companyName', 'placeJob', 'positionJob', 'action'];
  displayedContactPersonColumns = ['name', 'street', 'phone', 'action'];
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.initForm();
    this.rangeYear();
  }

  private initForm() {
    // this.initSupplementaryActionRowsForm();
    // this.initWorkRowsForm();
    // this.initFamilyRowsForm();
    // this.initContactPersonRowsForm();
    this.employeeForm = this.formBuilder.group({
      login: ['', Validators.required],
      // id: [(this.employee.id) ? this.employee.id : null],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      pesel: ['', [Validators.required, Validators.pattern('^[0-9]*$'),
      //   peselValidator({
      //   length: true,
      //   check: true
      // })
      ]],
      employeeAddress: this.formBuilder.group({
        street: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        city: ['', [Validators.required, Validators.maxLength(20)]],
        zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('^[0-9]*$')]],
        telephone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(12), Validators.pattern('^[0-9]*$')]]
      }),
      currentDegree: ['', [Validators.required]],
      finishedNameSchool: ['', [Validators.maxLength(255)]],
      finishedYearSchool: ['', Validators.maxLength(4)],
      profession: ['', Validators.maxLength(100)],
      professionAcademicTitle: ['', Validators.maxLength(40)],
      firstHigherTitle: ['', Validators.required],
      firstHigherTitleDate: [''],
      isFirstWork: [''],
      updateCity: ['Toruń', [Validators.required, Validators.maxLength(20)]],
      updateDate: [''],
      families: this.familyRows,
      contactPersons: this.contactPersonRows,
      // supplementaryEducations: this.suppliesRows,
      supplementaryEducations: this.formBuilder.array(this.editMode ? [] : [this.buildSupplementaryEducations()]),
      works: this.workRows,
      isAgree: ['', Validators.required]
    });
  }

  private updateSupplementaryEducationTable() {
    this.suppliesDataSource.next(this.suppliesRows.controls);
  }

  openSupplementaryEducationDialog(index: number) {
    const dialogRef = this.matDialog.open(SupplementaryEducationDialogComponent, {
      data: (index != null) ? this.suppliesRows.controls[index] : null
    });
    const s = dialogRef.afterClosed().subscribe(resultForm => {
      if (resultForm) {
        if (index == null) {
          this.suppliesRows.push(resultForm.resultForm);
          this.updateSupplementaryEducationTable();
          this.snackBarService.open('Zapisano poprawnie', '', {panelClass: 'snack-success'});
        } else {
          this.snackBarService.open('Edytowano poprawnie', '', {panelClass: 'snack-success'});
        }
        this.employeeForm.markAsDirty();
      }
    });
  }

  deleteSupplementaryEducationDialog(index: number): void {
    console.log('index name', this.suppliesRows.controls[index].get('name')?.value);
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {

      width: '400px',
      data: {
        title: 'Wykształcenie uzupełniające',
        message: `Czy na pewno chcesz usunąć wykształcenie uzupełniające ${this.suppliesRows.controls[index].get('name')?.value}? `,
        falseButtonName: 'Nie',
        trueButtonName: 'Tak'
      },
      panelClass: 'dialog-with-borders'
    });
    const s = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.suppliesRows.removeAt(index);
        this.updateSupplementaryEducationTable();
        this.snackBarService.open(`Wykształcenie ${this.suppliesRows.controls[index].get('name')?.value} uzupełniające zostało poprawnie usunięte`,
          '', {panelClass: 'snack-success'});
        this.employeeForm.markAsDirty();
      }
    });
    this.subscription.add(s);
  }

  private initSupplementaryActionRowsForm() {
    this.suppliesRows = this.formBuilder.array([]);
    //  this.employee.supplementaryEducations = [];
    //  this.employee.supplementaryEducations.forEach(se=> {
    //    console.log("suppp", se)
    //  })
    //  this.employee.supplementaryEducations.forEach(ca => this.addSupplementaryEducationActionRowForm(ca, false));
    //
    //  this.updateSupplementaryEducationTable();
    //  // console.log("Supp w get",this.employeeForm.get('supplementaryEducations'));
    // console.log('employee', this.employee)
    //  this.suppliesRows = this.buildSupplementaryEducations()
  }

  private initWorkRowsForm() {
    this.workRows = this.formBuilder.array([]);
    this.employee.works = [];
    this.employee.works.forEach(ca => this.onNewWork(ca, true));
    this.updateWorksTable();
  }

  private addSupplementaryEducationActionRowForm(supplementary: SupplementaryEducation = {} as SupplementaryEducation, update: boolean) {
    const row = this.formBuilder.group({
      name: [supplementary.name],
    });
    this.suppliesRows.push(row);
    if (update) {
      this.updateSupplementaryEducationTable();
    }
  }

  deleteContactPerson(index: number) {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Osoba do kontaktu',
        message: 'Czy na pewno chcesz usunąć osobę do kontaktu?',
        falseButtonName: 'Nie',
        trueButtonName: 'Tak'
      },
      panelClass: 'dialog-with-borders'
    });
    const s = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contactPersonRows.removeAt(index);
        this.updateContactPersonTable();
        this.snackBarService.open('Osoba do kontaktu została poprawnie usunięta', '', {panelClass: 'snack-success'});
        this.employeeForm.markAsDirty();
      }
    });
    this.subscription.add(s);
  }

  onNewWork(work: Work, update: boolean) {
    const row = this.formBuilder.group({
      fromJob: [work.fromJob],
      toJob: [work.toJob],
      companyName: [work.companyName],
      placeJob: [work.placeJob],
      positionJob: [work.positionJob]
    });
    this.workRows.push(row);
    if (update) {
      this.updateWorksTable();
    }
  }

  openWorkDialog(index: number) {
    const dialogRef = this.matDialog.open(WorkDialogComponent, {
      data: (index != null) ? this.workRows.controls[index] : null
    });
    const s = dialogRef.afterClosed().subscribe(resultForm => {
      if (resultForm) {
        if (index == null) {
          this.workRows.push(resultForm.resultForm);
          this.updateWorksTable();
          this.snackBarService.open('Zapisano poprawnie', '', {panelClass: 'snack-success'});
        } else {
          this.snackBarService.open('Edytowano poprawnie', '', {panelClass: 'snack-success'});
        }
        this.employeeForm.markAsDirty();
      }
    });
    this.subscription.add(s);
  }

  deleteWork(index: number) {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: `Praca ${this.workRows.controls[index].get('companyName')?.value}`,
        message: 'Czy na pewno chcesz usunąć pracę?',
        falseButtonName: 'Nie',
        trueButtonName: 'Tak'
      },
      panelClass: 'dialog-with-borders'
    });
    const s = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workRows.removeAt(index);
        this.updateWorksTable();
        this.snackBarService.open('Praca została poprawnie usunięta', '', {panelClass: 'snack-success'});
        this.employeeForm.markAsDirty();
      }
    });
    this.subscription.add(s);
  }

  private updateWorksTable() {
    this.worksDataSource.next(this.workRows.controls);
  }

  private initFamilyRowsForm() {
    this.familyRows = this.formBuilder.array([]);
    this.employee.families = [];
    this.employee.families.forEach(ca => this.addFamilyActionRowForm(ca, false));
    this.updateFamilyTable();
  }

  openFamilyMemberDialog(index: number) {
    const dialogRef = this.matDialog.open(FamilyDialogComponent, {
      data: (index != null) ? this.familyRows.controls[index] : null
    });
    const s = dialogRef.afterClosed().subscribe(resultForm => {
      if (resultForm) {
        if (index == null) {
          this.familyRows.push(resultForm.resultForm);
          this.updateFamilyTable();
          this.snackBarService.open('Zapisano poprawnie', '', {panelClass: 'snack-success'});
        } else {
          this.snackBarService.open('Edytowano poprawnie', '', {panelClass: 'snack-success'});
        }
        this.employeeForm.markAsDirty();
      }
    });
    this.subscription.add(s);
  }

  private updateFamilyTable() {
    this.familyDataSource.next(this.familyRows.controls);
  }

  private addFamilyActionRowForm(family: Family, update: boolean) {
    const row = this.formBuilder.group({
      nameFamily: [family.nameFamily],
      dobFamily: [family.dobFamily],
      relation: [family.relation]
    });
    this.familyRows.push(row);
    if (update) {
      this.updateFamilyTable();
    }
  }

  deleteFamilyMember(index: number) {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Członek rodziny',
        message: 'Czy chcesz usunąć członka rodziny?',
        falseButtonName: 'Nie',
        trueButtonName: 'Tak'
      },
      panelClass: 'dialog-with-borders'
    });
    const s = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.familyRows.removeAt(index);
        this.updateFamilyTable();
        this.snackBarService.open('Członek rodziny został poprawnie usunięty', '', {panelClass: 'snack-success'});
        this.employeeForm.markAsDirty();
      }
    });
    this.subscription.add(s);
  }

  openContactPersonDialog(index: number) {
    const dialogRef = this.matDialog.open(ContactPersonDialogComponent, {
      width: '800px',
      panelClass: 'dialog-with-borders',
      data: (index != null) ? this.contactPersonRows.controls[index] : null
    });
    const s = dialogRef.afterClosed().subscribe(resultForm => {
      if (resultForm) {
        if (index == null) {
          this.contactPersonRows.push(resultForm.resultForm);
          this.updateContactPersonTable();
          this.snackBarService.open('Zapisano poprawnie', '', {panelClass: 'snack-success'});
        } else {
          this.snackBarService.open('Edytowano poprawnie', '', {panelClass: 'snack-success'});
        }
        this.employeeForm.markAsDirty();
      }
    });
    this.subscription.add(s);
  }

  initContactPersonRowsForm() {
    this.contactPersonRows = this.formBuilder.array([]);
    this.employee.contactPersons = [];
    this.employee.contactPersons.forEach(cp => this.addContactPersonRowForm(cp, false));
    this.updateContactPersonTable();
  }

  private addContactPersonRowForm(cp: ContactPerson, update: boolean) {
    const row = this.formBuilder.group({
      contactPersonName: [cp.contactPersonName],
      contactPersonAddress: this.formBuilder.group({
        street: [cp.contactPersonAddress.street],
        city: [cp.contactPersonAddress.city],
        zipcode: [cp.contactPersonAddress.zipcode],
        telephone: [cp.contactPersonAddress.telephone]
      })
    });
    this.contactPersonRows.push(row);
    if (update) {
      this.updateContactPersonTable();
    }
  }

  private updateContactPersonTable() {
    this.contactPersonDataSource.next(this.contactPersonRows.controls);
  }

  setEmployee(employee: Employee) {
    const {key, ...formData} = employee;
    this.employeeForm.patchValue(formData);
    // formData.supplementaryEducations.forEach(crewMember => this.addSupplementaryEducationActionRowForm(crewMember, true));
    // formData.families.forEach(family => this.addFamilyActionRowForm(family, true));
    // formData.contactPersons.forEach(contactPerson => this.addContactPersonRowForm(contactPerson, true));
    // formData.works.forEach(work => this.onNewWork(work, true));
    // formData.supplementaryEducations.forEach(supp=> this.addSupplementaryEducation(supp));
  }

  onCloseWithoutChanges() {
    this.router.navigate(['/dashboard/employees/']);
  }

  rangeYear() {
    // this.years.push(this.year);
    // for (let i = 1; i < 50; i++) {
    //   this.years.push(this.year - i);
    // }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  buildSupplementaryEducations(supplementary: SupplementaryEducation = {} as SupplementaryEducation) {
    return this.formBuilder.group({
      name: [supplementary.name || '',],

    });
  }

  addSupplementaryEducation(supplementary?: SupplementaryEducation) {
    this.supplEducation.push(this.buildSupplementaryEducations(supplementary));
  }

  get supplEducation() {
    console.log('Supp w get', this.employeeForm.get('supplementaryEducations'));
    return this.employeeForm.get('supplementaryEducations') as FormArray;

  }

  removeSupplementaryEducationsMember(i: number) {
    this.supplEducation.removeAt(i);
  }
}


