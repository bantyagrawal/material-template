import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LevelDialogComponent } from '../../level-dialog/level-dialog.component';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent {

   ModuleForm: FormGroup;
  
    constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<LevelDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.ModuleForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required]
      });
    }
  
    get ModuleControl(): FormControl {
      return this.ModuleForm.get('name') as FormControl;
    }

     get ModuledesControl(): FormControl {
      return this.ModuleForm.get('description') as FormControl;
    }
  
    onCancel(): void {
      this.dialogRef.close();
    }
  
    onSave(): void {
      if (this.ModuleForm.valid) {
        this.dialogRef.close(this.ModuleForm.value);
      }
    }

}
