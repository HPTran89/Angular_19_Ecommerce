import { Component } from '@angular/core';
import { ChildComponent } from "./child.component";
import { ButtonDemoComponent } from '../../../../shared/components/button/button-demo/button-demo.component';
import { ButtonSeverity } from 'primeng/button';

@Component({
  selector: 'app-c2p-parent',
  imports: [ChildComponent, ButtonDemoComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent {
  msgFromChild: string = 'No Message From Child Yet...';
   btnSeverity: ButtonSeverity = 'danger';
    btnText: string = 'Click Me'
    isRaised: boolean = false;

  handleMsgFromChild(event: any) {
    console.log(event)
    this.msgFromChild = event
  }

  handleBtnClick(event: any) {
    alert('Hello Mate')
  }
  
}
