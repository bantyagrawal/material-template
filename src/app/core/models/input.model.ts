import { FormControl } from "@angular/forms";

export interface InputData {
  label?: string;
  type?: string;
  control: FormControl;
  placeholder?: string;
  errorMessage?: string;
  customClass?: string;
  icon?: string; 
  isPasswordToggle?: boolean;
}