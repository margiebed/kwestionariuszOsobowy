// import { checkDay, checkMonth, checkSum } from './check-pesel';
// import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
//
// export function peselValidator(options: {
//   length?: boolean;
//   check?: boolean;
// }): ValidatorFn {
//
//   return (control:FormControl) => {
//
//     const errors = {};
//     let valid: boolean;
//     const PESEL = [] as any[];
//
//     if (options.length && control.value.length !== 11 && control.value.length > 0) {
//       errors['length'] = true;
//       valid = false;
//     } else if (control.value.length === 11) {
//       for (let i = 0; i < 11; i++) {
//         PESEL[i] = (control.value.substring(i, i + 1));
//       }
//       if (checkSum(PESEL) && checkMonth(PESEL) && checkDay(PESEL) && options.check) {
//         valid = true;
//       } else {
//         errors['check'] = true;
//         valid = false;
//       }
//     }
//     // @ts-ignore
//     return valid ? null : {
//       peselError: errors
//     };
//   };
// }
//
