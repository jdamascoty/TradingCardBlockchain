import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.css']
})
export class PopupDialogComponent {
  message = 'Add a Card to a User';
  confirmButtonText = 'Add';
  cancelButtonText = 'Cancel';

  constructor(
    private dialogRef: MatDialogRef<PopupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  onConfirmClick(): void {
    this.dialogRef.close();
  }

}
