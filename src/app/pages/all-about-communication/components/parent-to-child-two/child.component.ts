import { AfterViewInit, Component, contentChild, ElementRef, signal, ViewChild, viewChild } from '@angular/core';
import { ButtonDemoComponent } from "../../../../shared/components/button/button-demo/button-demo.component";
import { ButtonModule, ButtonSeverity } from 'primeng/button';

@Component({
  selector: 'app-p2cDirectAccess-child',
  imports: [ButtonDemoComponent, ButtonModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent implements AfterViewInit  {
  btnSeverity: ButtonSeverity = 'help'
  isRaised: boolean = true;
  btnText: string = "Click Me"

  @ViewChild('mySpecialBtn', { read: ElementRef }) myButtonRef!: ElementRef; // works for all button
 

  // protected button = viewChild<ElementRef<HTMLButtonElement>>('mySpecialBtn') // use this when using a regular HTML button, doesn't work with p-button from primeng
  childButtonText = signal('Not clicked yet');

  ngAfterViewInit() {
        // // Access the native DOM element using nativeElement
        // if (this.myButtonRef && this.myButtonRef.nativeElement) {
        //   console.log('my special button ', this.myButtonRef.nativeElement);
        // } else {
        //   console.warn('myButtonRef or nativeElement is not available');
        // }
        // // You can now manipulate the DOM element directly if needed
        // // For example, to change its style:
        // // this.myButtonRef.nativeElement.style.backgroundColor = 'blue';
      }

  childButtonClick(e: any) {
    this.childButtonText.set(this.myButtonRef?.nativeElement?.innerText ?? 'no inner text')
  }

  handleBtnClick() {
    alert('Hello Mate')
  }
}
