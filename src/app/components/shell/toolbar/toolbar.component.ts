import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { IUser, ILogoutReponse } from 'src/app/interfaces/i-response';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
  private onDestroy = new Subject<void>();
  public user: IUser;
  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  toggleD() {
    this.toggle.emit(null);
  }

  logout() {

    this.openDialog();

    // const payload: { id: number } = {
    //   id: this.user.id,
    // };

    this.auth
      .logout()
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => this.dialog.closeAll())
      )
      .subscribe(
        (res: ILogoutReponse) => {
          this.dialog.closeAll();
          this.snack.open(res.result.message, 'Close', {
            duration: 3000
          });
          this.router.navigate(['/login']);
        },
        (error: string) => {
          this.snack.open(error, 'Close', {
            duration: 2000
          });
        }
      );
  }

  openDialog(): void {
    this.dialog.open(DialogLoaderComponent, {
      width: '200px',
      disableClose: true
    });
  }



}


@Component({
  selector: 'app-dialog-loader',
  templateUrl: 'loader-dialog.html',
})
export class DialogLoaderComponent {

  color = 'accent';

  constructor() {
  }

}