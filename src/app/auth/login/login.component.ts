import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  loginForm: FormGroup;

  private onDestroy = new Subject<void>();


  constructor(
    private _fb: FormBuilder,
    // tslint:disable-next-line:variable-name
    private _snack: MatSnackBar,
    // tslint:disable-next-line:variable-name
    private _router: Router,
    // tslint:disable-next-line:variable-name
    private _auth: AuthService,
  ) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  onLoginSubmit() {
    const value = this.loginForm.value;
    const payload = {
      user: value.user,
      password: value.password
    };
    this.loginForm.disable();
    this._auth
      .login(payload)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.loginForm.enable()) // new thing
      )
      .subscribe(
        (response: any) => {
          this._snack.open(response.message, 'Close', {
            duration: 3000
          });
          const token = response.token;
          localStorage.setItem('token', token);
          this._router.navigate(['/employee']);
        },
        (error: string) => {
          this._snack.open(error, 'Close', {
            duration: 3000
          });
        }
      );
  }

}