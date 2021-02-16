import { AddRoomComponent } from './../../dialogs/add-room/add-room.component';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject, forkJoin } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBarModule, MatSnackBar, PageEvent, MatDialog } from '@angular/material';
import { ConfirmationComponent } from 'src/app/dialogs/confirmation/confirmation.component';
import { TaskService } from 'src/app/services/task.service';
import { animate, trigger, style, state, transition } from '@angular/animations';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constant';
import {
  takeUntil,
  debounceTime,
  distinctUntilChanged,
  filter
} from 'rxjs/operators';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TaskComponent implements OnInit, OnDestroy {
  
  pageNumber = 1;
  perPage = 25;
  searchStringSearchCtrl: FormControl = new FormControl();
  totalEntries = 0;
  taskSwitch: string;

  dataSource = new MatTableDataSource<any>([]);
  private _onDestroy = new Subject<any>();
  expandedElement: any | null;
  payload = {
    search_string: '',
  };

  displayedColumns = [
    // 'id',
    'room_id',
    'name',
    'booking_email',
    'sitting',
    'current_status',
    'edit',
    'delete',
  ];
  error: string;
  selectedTask: any;


  constructor(
    private router: Router,
    private dialog: MatDialog,
    private _auth: AuthService,
    private _snack: MatSnackBar,
    private task: TaskService,
    private http: HttpClient,
  ) {
    this.searchStringSearchCtrl.valueChanges
      .pipe(
        takeUntil(this._onDestroy),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(
        (value: any) => {
          this.payload.search_string = value;
          this.getConfRooms();
        });
  }


  ngOnInit() {
    this.getConfRooms()
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  onPageChanged(event: PageEvent) {
    this.pageNumber = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getConfRooms();
  }

  addAdmin() {
    const dialogRef = this.dialog.open(AddRoomComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  editTask(element: any) {
    const dialogRef = this.dialog.open(AddRoomComponent, {
      width: '530px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getConfRooms();
    });
  }

  deleteUser(value) {
    this.task.delete(Object.assign({},value))
      .subscribe(
        (res: any) => {
          this.getConfRooms();
        },
        (error: any) => {
         
        });
  }

  getConfRooms() {
    this.taskSwitch = 'loading';
    this.task.getRooms(this.payload)
      .pipe(
        takeUntil(this._onDestroy)
      )
      .subscribe(
        (res: any) => {
          const result = res;
          console.log(result)
          this.dataSource = new MatTableDataSource<any>(result.employees)
          this.taskSwitch = 'active';
        },
        (error: string) => {

        }
      );
  }

}
