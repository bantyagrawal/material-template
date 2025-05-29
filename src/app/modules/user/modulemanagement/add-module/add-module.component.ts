import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LevelDialogComponent } from '../../levelmanagement/level-dialog/level-dialog.component';
import { ApiService } from 'src/app/core/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent {

  ModuleForm: FormGroup;
  isProcessing!: boolean;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private toastr: ToastrService,
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
    if (this.isProcessing) {
      return;
    }
    this.isProcessing = true;
    if (this.ModuleForm.valid) {
      const newModule = this.ModuleForm.value;

      this.api.AddModule(newModule).subscribe({
        next: (res: any) => {
          this.toastr.success('Module Added Successfully!');
          this.ModuleForm.reset();
          this.dialogRef.close(this.ModuleForm.value);
          this.isProcessing = false;
        },
        error: (err: any) => {
          this.isProcessing = false;
        }
      }); 
    }
  }

}
