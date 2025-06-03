import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  fruitSelectedOption = '';

  constructor(public dialog: MatDialog) {}

  openWelcomeDialog() {
    this.dialog.open(DialogWelcomeComponent);
  }
}

@Component({
  selector: 'dialog-welcome',
  templateUrl: 'dialog-welcome.html',
})
export class DialogWelcomeComponent {
  
  constructor(public dialog: MatDialog) {}
  
  close() {
    this.dialog.closeAll();
  }
}



