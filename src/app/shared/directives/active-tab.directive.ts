import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appActiveTab]',
  standalone: true,
})
export class ActiveTabDirective {
  private static previousElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    this.highlight();
  }

  ngAfterViewInit(): void {
    if (!ActiveTabDirective.previousElement) {
      this.activate(this.el);
    }
  }

  activate(element: ElementRef) {
    this.removeActive();
    this.renderer.setStyle(element.nativeElement, 'backgroundColor', '#0d6efd');
    this.renderer.setStyle(element.nativeElement, 'color', '#ffffff');
    ActiveTabDirective.previousElement = element.nativeElement;
  }

  private highlight() {
    this.removeActive();
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '#0d6efd');
    this.renderer.setStyle(this.el.nativeElement, 'color', '#ffffff');
    ActiveTabDirective.previousElement = this.el.nativeElement;
  }

  private removeActive() {
    if (ActiveTabDirective.previousElement) {
      this.renderer.removeStyle(
        ActiveTabDirective.previousElement,
        'backgroundColor'
      );
      this.renderer.removeStyle(ActiveTabDirective.previousElement, 'color');
    }
  }
}
