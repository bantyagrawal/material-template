// modules/user/level-dialog/level-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-level-dialog',
  templateUrl: './level-dialog.component.html',
  styleUrls: ['./level-dialog.component.scss']
})
export class LevelDialogComponent {
  levelForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<LevelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.levelForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
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
      const payload = {
        levelId: +this.levelForm.value.id,         // match backend requirement
        status: 'active'                           // optional; backend defaults to this
      };
  
      this.apiService.createLevel(payload).subscribe({
        next: (res) => {
          this.snackBar.open('Level created successfully', 'Close', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (err) => {
          const errorMessage = err?.error?.message || 'Failed to create level';
          this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
          console.error(err);
        }
      });
    }
  }
  
}
