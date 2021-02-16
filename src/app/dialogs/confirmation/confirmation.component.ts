import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface SuccessData {
  message: string;
}

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SuccessData
  ) { }

  ngOnInit() {
  }

  confirm() {
    this.dialogRef.close('proceed');
  }

  cancel() {
    this.dialogRef.close('cancel');
  }

}
