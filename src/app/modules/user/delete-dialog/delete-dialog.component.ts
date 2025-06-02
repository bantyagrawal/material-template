import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  isProcessing!: boolean;

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  deleteRole() {
    if (this.isProcessing) {
      return;
    }

    this.isProcessing = true;
    const data = { uuid: this.data.roleId };
    
    // this.api.deleteRole(data).subscribe({
    //   next: (res: any) => {
    //     this.toastr.success('Role Deleted Successfully!');
    //     this.isProcessing = false;
    //     this.dialogRef.close(true);
    //   },
    //   error: (err: any) => {
    //     this.isProcessing = false;
    //   },
    // })
  }
}
