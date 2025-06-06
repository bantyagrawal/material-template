  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
  import { ToastrService } from 'ngx-toastr';
  import { ApiService } from 'src/app/core/services/api.service';
  import { CommonService } from 'src/app/core/services/common.service';

  @Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss']
  })
  export class EditProfileComponent implements OnInit {
    reactiveForm!: FormGroup;
    data:any;
    isProcessing!: boolean;
    walletOptions = [
      {
        label: 'SINGLE',
        value: 'Single'
      },
      {
        label: 'MULTI',
        value: 'Multi'
      },
      {
        label: 'BOTH',
        value: 'Both'
      }
    ];

    constructor(private fb: FormBuilder , private apiService: ApiService, private profile:CommonService,private toastr: ToastrService) {
      this.data=profile.permissions;
      
    }
    user = {
      avatar: 'https://i.pravatar.cc/150?img=3',
      name: 'John Doe'
    };

  

    ngOnInit(): void {
      this.reactiveForm = this.fb.group({
        name: ['', Validators.required],
        email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
        ipv4: ['', Validators.required],
        ipv6: ['', Validators.required],
        userId: [{ value: '', disabled: true }, Validators.required],
        mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        deviceId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        walletType: ['', Validators.required],
      });
      if (this.data) {
        this.reactiveForm.patchValue({
          name: this.data.name || '',
          email: this.data.email || '',
          ipv4: this.data.ipv4 || '',
          ipv6: this.data.ipv6 || '',
          userId: this.data.userId || '',
          mobile: this.data.mobileNumber || '',
          deviceId: this.data.deviceId || '',
          walletType: this.data.wallet_type || ''
        });
      }
    }

    
    onSubmit(): void {
      if (this.isProcessing) return;
        if (this.reactiveForm.invalid) {
        this.reactiveForm.markAllAsTouched();
        this.toastr.error('Please fill all required fields correctly.');
        return;
      }
    
      this.isProcessing = true;
      const formValue = this.reactiveForm.getRawValue();

      // const updatedUser = {
      //   uuid: this.data?.uuid,  
      //   name: this.reactiveForm.value.name,
      //   email: this.reactiveForm.value.email,
      //   userId: this.reactiveForm.value.userId,
      //   ipv4: this.reactiveForm.value.ipv4,
      //   ipv6: this.reactiveForm.value.ipv6,
      //   deviceId: this.reactiveForm.value.deviceId,
      //   mobileNumber: this.reactiveForm.value.mobile
      // };
      const updatedUser = {
        uuid: this.data?.uuid,  
        name: formValue.name,
        email: formValue.email,
        userId: formValue.userId,
        ipv4: formValue.ipv4,
        ipv6: formValue.ipv6,
        deviceId: formValue.deviceId,
        mobileNumber: formValue.mobile,
        walletType: formValue.walletType
      };
    
      this.apiService.editUser(updatedUser).subscribe({
        next: (res: any) => {
          this.toastr.success('Profile updated successfully!');
          this.isProcessing = false;
        },
        error: (err: any) => {
          console.error(err);
          this.toastr.error('Failed to update profile');
          this.isProcessing = false;
        }
      });
    }
    
    get nameControl(): FormControl {
      return this.reactiveForm.get('name') as FormControl;
    }
    get emailControl(): FormControl {
      return this.reactiveForm.get('email') as FormControl;
    }
    get ipv4Control(): FormControl {
      return this.reactiveForm.get('ipv4') as FormControl;
    }
    get ipv6Control(): FormControl {
      return this.reactiveForm.get('ipv6') as FormControl;
    }
    get userIdControl(): FormControl {
      return this.reactiveForm.get('userId') as FormControl;
    }
    get mobileControl(): FormControl {
      return this.reactiveForm.get('mobile') as FormControl;
    }
    get deviceIdControl(): FormControl {
      return this.reactiveForm.get('deviceId') as FormControl;
    }
    get walletTypeControl(): FormControl {
      return this.reactiveForm.get('walletType') as FormControl;
    }
    redirectFromPageHeader(data: string) {
      if (data === 'Home') {
        this.profile.redirectTo('user');
      }
    }
    redirectTo(path: string) {
      this.profile.redirectTo(path);
    }

    logout() {
      this.apiService.logOut().subscribe((res: any) => {
        this.redirectTo('login');
      });
    }
    
  }
