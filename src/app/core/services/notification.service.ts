import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../../shared/components/notification-dialog/notification-dialog.component';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnDestroy {
  private testIntervalId: any;
  private socket!: Socket;

  constructor(private dialog: MatDialog) {
    this.initializeSocketConnection();
    // Uncomment below to test with mock notifications
    /*
    this.testIntervalId = setInterval(() => {
      this.showNotification({
        title: 'Test Notification',
        message: 'This notification appears every 5 seconds for testing.'
      });
    }, 5000);
    */
  }

  private initializeSocketConnection(): void {
    this.socket = io('http://localhost:4000', {
      transports: ['websocket'],
      reconnectionAttempts: 3,
      timeout: 5000
    });

    this.socket.on('connect', () => {
      console.log('🟢 Connected to Socket.io server:', this.socket.id);
    });

    this.socket.on('notification', (data) => {
      console.log('📩 Notification received:', data);
      this.showNotification(data);
    });

    this.socket.on('connect_error', (err) => {
      console.error('❌ Socket connection error:', err);
    });

    this.socket.on('disconnect', (reason) => {
      console.warn('🔌 Disconnected from Socket.io:', reason);
    });
  }

  private showNotification(data: { title: string; message: string }): void {
    this.dialog.open(NotificationDialogComponent, {
      data,
      disableClose: true,
      width: '350px'
    });
  }

  ngOnDestroy(): void {
    if (this.testIntervalId) {
      clearInterval(this.testIntervalId);
    }

    if (this.socket) {
      this.socket.disconnect();
      console.log('🔒 Socket disconnected on destroy');
    }
  }
}
