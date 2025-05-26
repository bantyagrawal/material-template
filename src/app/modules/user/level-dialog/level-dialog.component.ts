import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-level-dialog',
  templateUrl: './level-dialog.component.html',
  styleUrls: ['./level-dialog.component.scss']
})
export class LevelDialogComponent {
  levelForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LevelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.levelForm = this.fb.group({
      id: ['', Validators.required]
    });
  }

  get levelControl(): FormControl {
    return this.levelForm.get('id') as FormControl;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.levelForm.valid) {
      this.dialogRef.close(this.levelForm.value);
    }
  }
}
