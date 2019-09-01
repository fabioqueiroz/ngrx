import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';
import { Store, select } from '@ngrx/store';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;

  constructor(private _authService: AuthService,
              private _router: Router,
              private _store: Store<any>) {
  }

  ngOnInit(): void {
    this._store.pipe(select('maskUserName')).subscribe(user => {

      if (user) {
        this.maskUserName = user.showUserName;
      }     
    });
  }

  cancel(): void {
    this._router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    // this.maskUserName = value;
    this._store.dispatch({
      type: 'MASK_USER_NAME',
      payload: value
    });
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this._authService.login(userName, password);

      if (this._authService.redirectUrl) {
        this._router.navigateByUrl(this._authService.redirectUrl);
      } else {
        this._router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
