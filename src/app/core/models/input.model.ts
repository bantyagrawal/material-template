import { FormControl } from "@angular/forms";

 export interface InputData {
  label: string;
  placeholder: string;
  type: string;
  control: FormControl;
  errorMessage: string;
  customClass: string;
}