export interface ButtonData {
  label: string;
  color: string;
  icon?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  customClass?: string;
}