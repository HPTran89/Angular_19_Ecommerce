import { Component, input, Input, output } from '@angular/core';
import { ButtonModule, ButtonSeverity } from 'primeng/button'

@Component({
  selector: 'app-button-demo',
  imports: [ButtonModule],
  templateUrl: './button-demo.component.html',
  styleUrl: './button-demo.component.css'
})
export class ButtonDemoComponent {
  @Input() btnSeverity: ButtonSeverity = 'help'; 
  btnText = input<string>('Default Text');
  isRaised = input<boolean>(false);
  clickEvent = output<any>();

  onBtnClick(event: any) {
    this.clickEvent.emit(event)
  }
}
