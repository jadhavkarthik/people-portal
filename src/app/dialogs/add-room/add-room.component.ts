import { TaskService } from 'src/app/services/task.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ConfirmationComponent } from 'src/app/dialogs/confirmation/confirmation.component';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit {
  userData: any;
  roomForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _snack: MatSnackBar,
    private dialogRef: MatDialogRef<AddRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _task : TaskService,
  ) { }

  ngOnInit(): void {
    this.buildroomForm()
  }

  patchroomForm() {
    this.roomForm.controls.current_status.setValue(this.data.current_status);
  }

  buildroomForm() {
    this.roomForm = this.fb.group({
      name: ['', []],
      booking_email: ['', []],
      sitting: ['', []],
      current_status : ['', []],
    });
  }

  createAdmin() {
    if (this.data == null) {
      this.openConfirmDialog('Are you sure you want to Create this room ?', 0)
    } else {
      this.openConfirmDialog('Are you sure you want to Edit these room details ?', 1)
    }
  }

  openConfirmDialog(message, type) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      disableClose: true,
      width: '500px',
      data: { message }
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result === 'proceed') {
          type == 0 ? this.createUser(this.roomForm.value) : this.editUser(this.roomForm.value)
        } else {
          this.dialogRef.close();
        }
      }
    );
  }


  createUser(value) {
    this._task.register(Object.assign({}, value))
      .subscribe(
        (res: any) => {
          this._snack.open('Successfully created the user', 'Close', { // edit the text as per opertation
            duration: 7000
          });
          this.dialogRef.close();
        },
        (error: any) => {
          this._snack.open('Server Side issue!', 'Close', {
            duration: 7000
          });
        });
  }

  editUser(value) {
    this._task.register(Object.assign({}, { id: this.data.id }, value))
      .subscribe(
        (res: any) => {
          this._snack.open('Successfully edited the user', 'Close', { // edit the text as per opertation
            duration: 3000
          });
          this.dialogRef.close({ status: 'edited' });
        },
        (error: any) => {
          this._snack.open('Server Side issue!', 'Close', {
            duration: 3000
          });
        });
  }

}
