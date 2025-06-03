import { Component, Input, TemplateRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-tab-item',
  template: ''
})
export class TabItemComponent {
  @Input() title!: string;  // Title shown in the tab header
  @Input() active = false;  // Whether this tab is initially active

  // Holds the content from <ng-template>
  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;
}
