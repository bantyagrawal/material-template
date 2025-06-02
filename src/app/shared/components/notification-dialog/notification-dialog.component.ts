import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent implements OnInit, OnDestroy {
  private autoCloseTimeout: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string },
    private dialogRef: MatDialogRef<NotificationDialogComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // console.log('notifation on!')
    // // Auto close dialog after 15 seconds
    // this.autoCloseTimeout = setTimeout(() => {
    //   this.close();
    // }, 15000);

    // // After dialog closes, reopen after 15 seconds
    // this.dialogRef.afterClosed().subscribe(() => {
    //   setTimeout(() => {
    //     this.dialog.open(NotificationDialogComponent, {
    //       data: {
    //         title: 'Auto Notification',
    //         message: 'This notification appears every 15 seconds.'
    //       },
    //       disableClose: true
    //     });
    //     console.log('notification!')
    //   }, 100);
    // });
  }

  close() {
    clearTimeout(this.autoCloseTimeout);
    this.dialogRef.close();
  }

  ngOnDestroy() {
    clearTimeout(this.autoCloseTimeout);
  }
}
