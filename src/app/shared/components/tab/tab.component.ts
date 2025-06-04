import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { TabItemComponent } from './tab-item.component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements AfterContentInit {
  @ContentChildren(TabItemComponent) tabItems!: QueryList<TabItemComponent>;
  activeTabIndex = 0;

  // it checks which tab has [active]="true" and selects it.
  ngAfterContentInit(): void {
    const index = this.tabItems.toArray().findIndex(tab => tab.active);
    this.activeTabIndex = index !== -1 ? index : 0;   // Show first tab active if none marked as active
  }

  // updates the activeTabIndex, which Angular uses to conditionally render content.
  selectTab(index: number): void {
    this.activeTabIndex = index;
  }
}
