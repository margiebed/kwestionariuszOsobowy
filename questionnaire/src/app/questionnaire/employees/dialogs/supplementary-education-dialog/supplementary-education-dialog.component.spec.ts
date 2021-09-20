import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplementaryEducationDialogComponent } from './supplementary-education-dialog.component';

describe('SupplementaryEducationDialogComponent', () => {
  let component: SupplementaryEducationDialogComponent;
  let fixture: ComponentFixture<SupplementaryEducationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplementaryEducationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplementaryEducationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
