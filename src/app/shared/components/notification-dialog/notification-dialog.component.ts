import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from "@angular/material/dialog";

@Component({
  selector: "app-notification-dialog",
  templateUrl: "./notification-dialog.component.html",
  styleUrls: ["./notification-dialog.component.scss"],
})
export class NotificationDialogComponent implements OnInit, OnDestroy {
  private autoCloseTimeout: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string },
    private dialogRef: MatDialogRef<NotificationDialogComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if (
      document.visibilityState === "visible" ||
      Notification.permission !== "granted"
    ) {
      const audio = new Audio("/assets/sounds/notification1.wav");
      audio.play().catch((e) => console.warn("Audio autoplay blocked:", e));
    }
  }

  close() {
    clearTimeout(this.autoCloseTimeout);
    this.dialogRef.close();
  }

  ngOnDestroy() {
    clearTimeout(this.autoCloseTimeout);
  }
}
