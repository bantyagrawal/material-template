import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../../shared/components/notification-dialog/notification-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnDestroy {
  private testIntervalId: any;

  constructor(private dialog: MatDialog) {
    // For testing: show a notification every 5 seconds
    // this.testIntervalId = setInterval(() => {
    //   this.showNotification({
    //     title: 'Test Notification',
    //     message: 'This notification appears every 5 seconds for testing.'
    //   });
    // }, 3000);

    // Uncomment below and implement actual socket logic when backend is ready
    /*
    this.socket = io('http://localhost:3000');
    this.socket.on('notification', (data) => {
      this.showNotification(data);
    });
    */
  }

  showNotification(data: { title: string; message: string }) {
    this.dialog.open(NotificationDialogComponent, {
      data,
      disableClose: true,
      width: '350px'
    });
  }

  ngOnDestroy() {
    if (this.testIntervalId) {
      clearInterval(this.testIntervalId);
    }
  }
}
