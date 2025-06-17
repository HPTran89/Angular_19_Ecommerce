import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule, ButtonSeverity } from 'primeng/button';
import { ButtonDemoComponent } from "../../../../shared/components/button/button-demo/button-demo.component";

@Component({
  selector: 'app-c2p-child',
  imports: [ButtonModule, CommonModule, FormsModule, ButtonDemoComponent],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {
  btnSeverity: ButtonSeverity = 'info';
  btnText: string = 'My Special Button'
  isRaised: boolean = true;
  private data: any = [
    {
      firstName: 'Hung',
      lastName: 'Tran',
      Age: 36
    }, 
    {
      firstName: 'Thinh',
      lastName: 'Tran',
      Age: 35
    }, 
    {
      firstName: 'Lily',
      lastName: 'Tran',
      Age: 33
    }, 
    {
      firstName: 'Loc',
      lastName: 'Tran',
      Age: 40
    }, 
    {
      firstName: 'First',
      lastName: 'Last',
      Age: 25
    }, 
    {
      firstName: 'Person',
      lastName: 'One',
      Age: 24
    }, 
    {
      firstName: 'Person',
      lastName: 'Two',
      Age: 23
    }
  ];

  // Example: Search for an object with a specific property value
  findObjectByKey(key: string, value: any) {
    return this.data.find((item: any) => item[key] === value);
  }

  @Output() msgToParent: EventEmitter<string> = new EventEmitter<string>();
  msgInput: string = ''; // two way binding for custom input from user
  passMsgToParent() {
    this.msgToParent.emit(this.msgInput)
  }

  handleBtnClick(event: any) {
    alert("Special button clicked")
  }
}
