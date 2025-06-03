import { Injectable, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NotificationDialogComponent } from "../../shared/components/notification-dialog/notification-dialog.component";
import { io, Socket } from "socket.io-client";

@Injectable({
  providedIn: "root",
})
export class NotificationService implements OnDestroy {
  private testIntervalId: any;
  private socket!: Socket;

  constructor(private dialog: MatDialog) {
    this.requestBrowserNotificationPermission();
    this.initializeSocketConnection();
  }

  /** 🔐 Request Notification permission once */
  private requestBrowserNotificationPermission(): void {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        console.log("🔐 Notification permission:", permission);
      });
    }
  }

  private initializeSocketConnection(): void {
    this.socket = io("http://localhost:4000", {
      transports: ["websocket"],
      reconnectionAttempts: 3,
      timeout: 5000,
    });

    this.socket.on("connect", () => {
      console.log("🟢 Connected to Socket.io server:", this.socket.id);
    });

    this.socket.on("notification", (data) => {
      console.log("📩 Notification received:", data);
      this.showNotification(data);
      this.showBrowserNotification(data);
    });

    this.socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err);
    });

    this.socket.on("disconnect", (reason) => {
      console.warn("🔌 Disconnected from Socket.io:", reason);
    });
  }

  private showNotification(data: { title: string; message: string }): void {
    this.dialog.open(NotificationDialogComponent, {
      data,
      disableClose: true,
      width: "350px",
    });
  }

  private showBrowserNotification(data: {
    title: string;
    message: string;
  }): void {
    if (
      "Notification" in window &&
      Notification.permission === "granted" &&
      document.visibilityState !== "visible"
    ) {
      const notification = new Notification(data.title, {
        body: data.message,
        icon: "/assets/images/notification-icon.png",
      });

      // 🔁 Focus the window when user clicks the notification
      notification.onclick = () => {
        console.log("🔍 Notification clicked");
        window.focus();
        window.blur(); // Optional: reset focus for some OSes
      };
    }
  }

  ngOnDestroy(): void {
    if (this.testIntervalId) {
      clearInterval(this.testIntervalId);
    }

    if (this.socket) {
      this.socket.disconnect();
      console.log("🔒 Socket disconnected on destroy");
    }
  }
}
