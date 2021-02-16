import { UserService } from './../../services/user.service';
import { IUser } from 'src/app/interfaces/i-response';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ConfirmationComponent } from 'src/app/dialogs/confirmation/confirmation.component';

export interface Location {
  text: string;
  value: string;
}
@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent implements OnInit {

  userData: any;
  adminForm: FormGroup;
  teams: any[];

  constructor(
    private fb: FormBuilder,
    private _snack: MatSnackBar,
    private dialogRef: MatDialogRef<CreateAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _user : UserService
  ) {
    this.buildAdminForm();
  }

  ngOnInit() {
    if (this.data) {
      this.patchAdminForm()
    }
    
  }

  patchAdminForm() {
    this.adminForm.controls.name.setValue(this.data.name);
    this.adminForm.controls.email.setValue(this.data.email);
    this.adminForm.controls.role.setValue(this.data.role);

    this.adminForm.controls.position.setValue(this.data.position);
    this.adminForm.controls.team.setValue(this.data.team);
    this.adminForm.controls.phone_no.setValue(this.data.phone_no);
  }

  buildAdminForm() {
    this.adminForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: ['', [Validators.required]],
      position: ['', [Validators.required]],
      team: ['', [Validators.required]],
      phone_no: ['', [Validators.required]],
      password: ['', []],
    });
  }

  createAdmin() {
    if (this.data == null) {
      this.openConfirmDialog('Are you sure you want to Create this user ?', 0)
    } else {
      this.openConfirmDialog('Are you sure you want to Edit these user details ?', 1)
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
          type == 0 ? this.createUser(this.adminForm.value) : this.editUser(this.adminForm.value)
        } else {
          this.dialogRef.close();
        }
      }
    );
  }


  createUser(value) {
    this._user.register(Object.assign({}, value))
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
    this._user.register(Object.assign({}, { id: this.data.id }, value))
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
