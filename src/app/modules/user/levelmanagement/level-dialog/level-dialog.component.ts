// modules/user/level-dialog/level-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { ToastrService } from 'ngx-toastr';

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
    private toaster: ToastrService,
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
        levelId: +this.levelForm.value.id,        
        status: 'active'                           
      };
  
      this.apiService.createLevel(payload).subscribe({
        next: (res) => {
          this.toaster.success('Level created successfully');
          this.dialogRef.close(true);
        },
        error: (err) => {
        }
      });
    }
  }
  
}
