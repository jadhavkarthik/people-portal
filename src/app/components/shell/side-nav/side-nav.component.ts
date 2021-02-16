import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { AuthService } from '../../../auth.service';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { IUser } from '../../../interfaces/i-response';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {

  private onDestroy = new Subject<void>();
  user: IUser;

  constructor(
    private auth: AuthService,
    public dialog: MatDialog,
    // tslint:disable-next-line:variable-name
    private _snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
