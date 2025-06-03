/**
 * TooltipComponent
 * ----------------
 * This component wraps any element and displays a custom tooltip on hover.
 * Tooltip text, position (top/right/bottom/left), and delay are configurable via @Input().
 * 
 * The tooltip is created dynamically and appended to the body, positioned absolutely based on host element.
 * All visual styling is managed via the 'dynamic-tooltip' class in the SCSS file.
 * 
 * Usage:
 * <app-tooltip text="Hello tooltip!" position="top">
 *   <button>Hover me</button>
 * </app-tooltip>
 */

import {
  Component,
  Input,
  HostListener,
  ElementRef,
  Renderer2,
  OnDestroy,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-tooltip',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit, OnDestroy {
  @Input() text = 'Text';
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() delay = 300;

  private tooltipElement!: HTMLElement;
  private showTimeout!: ReturnType<typeof setTimeout>;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.showTimeout = setTimeout(() => this.showTooltip(), this.delay);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    clearTimeout(this.showTimeout);
    this.removeTooltip();
  }

  // Main tooltip for creating and styling tooltip
  showTooltip() {
    // Create a new <span> element to display the tooltip text
    this.tooltipElement = this.renderer.createElement('span');

    // Set the inner text of the tooltip element
    this.tooltipElement.innerText = this.text;
    this.renderer.appendChild(document.body, this.tooltipElement);

    // Apply a CSS class that contains all tooltip styles (defined in SCSS)
    this.renderer.addClass(this.tooltipElement, 'dynamic-tooltip');

    // Append the tooltip to the <body> so it appears outside of current component's DOM
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltipElement.getBoundingClientRect();

    let top = 0;
    let left = 0;

    // Calculate tooltip position based on the selected "position" input
    switch (this.position) {
      case 'top': 
        // Position above the host element, centered horizontally
        top = hostPos.top - tooltipPos.height - 8;
        left = hostPos.left + hostPos.width / 2 - tooltipPos.width / 2;
        break;
      case 'bottom': 
        // Position below the host element, centered horizontally
        top = hostPos.bottom + 8;
        left = hostPos.left + hostPos.width / 2 - tooltipPos.width / 2;
        break;
      case 'left':
        // Position to the left of the host element, vertically centered
        top = hostPos.top + hostPos.height / 2 - tooltipPos.height / 2;
        left = hostPos.left - tooltipPos.width - 8;
        break;
      case 'right':
        // Position to the right of the host element, vertically centered
        top = hostPos.top + hostPos.height / 2 - tooltipPos.height / 2;
        left = hostPos.right + 8;
        break;
    }
    
    // Apply the dynamically calculated position styles to the tooltip element
    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
  }


  // remove tooltip when no longer needed like user move the cursor etc
  removeTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
    }
  }

  ngOnDestroy() {
    this.removeTooltip();
  }
}
