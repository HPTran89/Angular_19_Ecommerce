import { Component, OnInit } from '@angular/core';
import { ChildComponent } from "./child.component";
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-p2c1-parent',
  imports: [ChildComponent, ButtonModule,  CommonModule, FormsModule, SelectModule ],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent implements OnInit{
  userInput: string = '';
  msgToChild: string ='';
templates: {}[] = [
  { name: 'No Template', value: undefined },
  { name: 'Template A', value: 'Template A' },
  { name: 'Template B', value: 'Template B' },
  { name: 'Template C', value: 'Template C' }
];
  selectTemplate: string | undefined;

  ngOnInit(): void {
  }
  
  sendMsgToChild(): void {
   this.msgToChild = this.userInput
  }

}
