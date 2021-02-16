import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  message: string;

  constructor(
    private dialogRef: MatDialogRef<SuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    // this.message = this.data;
  }

  closeDialog() {
    this.dialogRef.close('ok');
  }

}
