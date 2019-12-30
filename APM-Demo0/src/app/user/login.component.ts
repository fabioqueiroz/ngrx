import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';
import { Store, select } from '@ngrx/store';

import * as fromRoot from './state/user.reducer';
import * as userActions from '../user/state/user.actions';

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
              private _store: Store<fromRoot.UserState>) {
  }

  ngOnInit(): void {
    this._store.pipe(select(fromRoot.getShowUserName)).subscribe(showUserName => 
         this.maskUserName = showUserName
    );
  }

  cancel(): void {
    this._router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    // version 1
    // this.maskUserName = value;

    // version 2
    // this._store.dispatch({
    //   type: 'MASK_USER_NAME',
    //   payload: value
    // });

    // version 3
    this._store.dispatch(new userActions.ToggleMaskUserName(value));
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
