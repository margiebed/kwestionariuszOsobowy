import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MaterialModule } from './material/material.module';
import { ValidationFeedbackComponent } from './validation/validation-feedback/validation-feedback.component';


@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    ValidationFeedbackComponent
  ],
  exports: [
    ValidationFeedbackComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,

  ],
  entryComponents: [ConfirmationDialogComponent]

})
export class SharedModule { }
