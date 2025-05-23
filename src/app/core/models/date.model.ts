import { FormControl } from "@angular/forms";

export interface DatePickerData {
  control: FormControl;
  label?: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  customClass?: string;
  errorMessage?: string;
}