import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateAdminComponent } from 'src/app/dialogs/create-admin/create-admin.component';
import { Subject } from 'rxjs';
import {
  MatSnackBar,
  PageEvent,
  MatTableDataSource
} from '@angular/material';
import {
  takeUntil,
  debounceTime,
  distinctUntilChanged,
  filter
} from 'rxjs/operators';
import { IUser } from 'src/app/interfaces/i-response';
import { UserService } from 'src/app/services/user.service';
import {
  animate,
  trigger,
  style,
  state,
  transition
} from '@angular/animations';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class UserComponent implements OnInit, OnDestroy {
  searchStringSearchCtrl: FormControl = new FormControl();
  userSwitch: string;
  private onDestroy = new Subject<void>();
  error: string;
  payload = {
    search_string: '',
  };
  users = [];
  totalUsers: number;
  expandedElement: any | null;
  displayedColumns: string[] = [
    'emp_id',
    'name',
    'email',
    'position',
    'team',
    'phone',
    'actions',
  ];
  userObject: IUser;
  constructor(
    private dialog: MatDialog,
    private user: UserService,
    private snack: MatSnackBar
  ) {
    this.searchStringSearchCtrl.valueChanges
      .pipe(
        takeUntil(this.onDestroy),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(
        (value: any) => {
          this.payload.search_string = value;
          this.users = [];
          this.fetchUsers();
        });
  }

  handleListSuccess(result: any): void {
    this.users = result.employees;
    this.userSwitch = 'active';
  }

  handleListError(error: string): void {
    this.error = error;
    this.userSwitch = 'error';
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userSwitch = 'loading';
    this.user.getUsers(this.payload)
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(
        (res: any) => {
          const result = res;
          this.handleListSuccess(result);
        },
        (error: string) => {
          this.handleListError(error);
        }
      );
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  addAdmin() {
    const dialogRef = this.dialog.open(CreateAdminComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  onPageChanged(event: PageEvent) {
    this.fetchUsers();
  }

  editUser(element: any) {
    const dialogRef = this.dialog.open(CreateAdminComponent, {
      width: '530px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchUsers();
    });
  }

  deleteUser(value) {
    this.user.delete(Object.assign({},value))
      .subscribe(
        (res: any) => {
          this.fetchUsers();
        },
        (error: any) => {
         
        });
  }


}
