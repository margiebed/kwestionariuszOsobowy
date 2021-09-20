import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase';

export interface User {
  // uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private user: firebase.User;

  authState: any = null;

  constructor(
    public afs: AngularFirestore,
    public fireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.fireAuth.authState.subscribe(auth => {
      this.authState = auth;
    });
  }

  login(credentials: Credentials) {
    return this.fireAuth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }

  get user() {
    return this.authState['email'];
  }

  isLoggedIn() {
    return !!this.fireAuth.currentUser;
  }

  logout() {
    return this.fireAuth.signOut();
  }

}
