import { Directive, ElementRef, inject, input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
  appHighlight = input('yellow');
  private el = inject(ElementRef);
  constructor() { }
  ngOnInit(): void {
    this.el.nativeElement.style.backgroundColor = this.appHighlight;
  }

}
