import { FormControl } from '@angular/forms';

export interface SelectData {
    label?: string;
    options: { label: string; value: any }[];
    control: FormControl;
    placeholder?: string;
    appearance?: 'fill' | 'outline';
    customClass?: string;
    errorMessage?: string;
}

export interface SelectOption {
    label: string;
    value: any
}
