import { Component, contentChild, ElementRef, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { ChildComponent } from "./child.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-p2cDirectAccess-parent',
 imports: [SelectModule, ButtonModule, ChildComponent, CommonModule],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent {
  @ViewChild(ChildComponent) childComponent!: ChildComponent; 
  @ViewChild('mySpecialSpan', {read: ElementRef}) spanMe!: ElementRef;
  //  protected button = contentChild<ElementRef<HTMLButtonElement>>('btn') 
   protected name3 = contentChild<ElementRef<HTMLSpanElement>>('name3') 

   callingChildMethod() {
    this.childComponent.handleBtnClick();
   }

   changeChildBtnText() {
    const sayings = [' Little buddy', ' Mate', ' Little guy'];
    const randomIndex = Math.floor(Math.random() * 3);
    const s = this.spanMe;
    if (s && s.nativeElement) {
      s.nativeElement.innerText = sayings[randomIndex];
      console.log(s)
    }
   }
}
