import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-validation-feedback',
  templateUrl: './validation-feedback.component.html',
  styleUrls: ['./validation-feedback.component.scss']
})
export class ValidationFeedbackComponent  {

  @Input() control;
  @Input() controlName;
  @Input() maxLength;
  @Input() minLength;
  @Input() lastLetter;
  @Input() pattern;

  constructor() {
  }
}
