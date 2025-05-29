import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pageheader',
  templateUrl: './pageheader.component.html',
  styleUrls: ['./pageheader.component.scss']
})
export class PageheaderComponent {

  @Input() title!: string;
  @Input() subtitle!: string[];
  @Input() customClass!: string;
  @Output() spanClicked = new EventEmitter<string>();

  ngOnChanges() {
    console.log('Input changed:', this.customClass);
  }

  onSpanClick(data: string) {
    this.spanClicked.emit(data);
  }

}
