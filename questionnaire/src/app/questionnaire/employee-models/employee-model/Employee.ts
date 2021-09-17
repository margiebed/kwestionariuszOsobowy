import { Address } from '../address-model/address.model';
import { Family } from '../family-model/family.model';
import { ContactPerson } from '../contact/contact-person.model';
import { SupplementaryEducation } from '../supp/supplementary-education.model';
import { Work } from '../work-model/work.model';

export interface Employee {

  login: string;
  firstName: string;
  lastName: string;
  pesel: string;
  employeeAddress: Address;
  currentDegree: string;
  finishedNameSchool: string;
  finishedYearSchool: number;
  profession?: any;
  professionAcademicTitle: string;
  firstHigherTitle: string;
  firstHigherTitleDate: string;
  isFirstWork: boolean;
  updateCity: string;
  updateDate?: any;
  families: Family[];
  contactPersons: ContactPerson[];
  supplementaryEducations: SupplementaryEducation[];
  works: Work[];
  key: string;
}
