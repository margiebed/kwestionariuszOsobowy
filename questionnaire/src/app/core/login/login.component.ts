import { Component} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  constructor(public authService: AuthService, private router: Router, private matSnackBar: MatSnackBar) {
  }

  credentials = {
    email: '',
    password: ''
  };

  hide = true;

  login() {
    this.authService.login(this.credentials).then(() => this.router.navigate(['/dashboard']))
    .catch(()=> this.matSnackBar.open('Podaj poprawne dane', '', {panelClass: 'snack-error'}));
  }

}
