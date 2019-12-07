import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-error-popup-dialog',
  templateUrl: './error-popup-dialog.component.html',
  styleUrls: ['./error-popup-dialog.component.css']
})
export class ErrorPopupDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ErrorPopupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  onConfirmClick(): void {
    this.dialogRef.close('yes');
  }
}
