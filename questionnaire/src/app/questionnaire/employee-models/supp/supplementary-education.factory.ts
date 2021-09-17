import { Injectable } from '@angular/core';
import { SupplementaryEducationResponseBody } from './supplementary-education.response-body';
import { SupplementaryEducation } from './supplementary-education.model';

@Injectable({providedIn: 'root'})
export class SupplementaryEducationFactory {

  constructor() {
  }

  create(response: SupplementaryEducationResponseBody) {
    const supplementaryEducation = new SupplementaryEducation();
    supplementaryEducation.id = response.id;
    supplementaryEducation.name = response.name;
    supplementaryEducation.item = response.item;
    supplementaryEducation.educationDate = response.educationDate;
    supplementaryEducation.during = response.during;
    return supplementaryEducation;
  }
}
