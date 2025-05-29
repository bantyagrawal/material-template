import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pageheader',
  templateUrl: './pageheader.component.html',
  styleUrls: ['./pageheader.component.scss']
})
export class PageheaderComponent {

  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() customClass!: string;

  ngOnChanges() {
    
      console.log('Input changed:',this.customClass);
  }
  
}
