import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { regexValidation } from '../../core/constant/constant'
@Directive({
  selector: '[appValidation]'
})
export class ValidationDirective {

  @Input('appValidation') pattern!: any;
  private regex!: RegExp;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    if (this.pattern !== '') {
      this.regex = typeof regexValidation[this.pattern].regex == 'string' ? new RegExp(regexValidation[this.pattern].regex) : regexValidation[this.pattern].regex;
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const currentInputValue = inputElement.value;
    const key = event.key;
    const selectionStart = inputElement.selectionStart;
    const selectionEnd = inputElement.selectionEnd;
    const specialKeys = [
      'Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Delete', 'Home', 'End'
    ];

    if (specialKeys.includes(key)) {
      return;
    }

    if ((event.ctrlKey || event.metaKey) && key === 'v') {
      return;
    }

    let nextValue = '';
    if (selectionStart !== null && selectionEnd !== null) {
      nextValue =
        currentInputValue.substring(0, selectionStart) +
        key +
        currentInputValue.substring(selectionEnd);
    } else {
      nextValue = currentInputValue + key;
    }
    console.log("RESULT", this.regex.test(nextValue));

    if (!this.regex.test(nextValue)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text/plain');

    if (pastedText) {
      const inputElement = this.el.nativeElement as HTMLInputElement;
      const currentInputValue = inputElement.value;
      const selectionStart = inputElement.selectionStart;
      const selectionEnd = inputElement.selectionEnd;

      let nextValue = '';
      if (selectionStart !== null && selectionEnd !== null) {
        nextValue =
          currentInputValue.substring(0, selectionStart) +
          pastedText +
          currentInputValue.substring(selectionEnd);
      } else {
        nextValue = currentInputValue + pastedText;
      }

      if (this.regex.test(nextValue)) {
        inputElement.value = nextValue;
        inputElement.dispatchEvent(new Event('input'));
      }
    }
  }
}
