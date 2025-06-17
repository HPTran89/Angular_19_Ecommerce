import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ParentComponent as parentToChildOne } from "./components/parent-to-child-one/parent.component";
import { ChildComponent } from "./components/parent-to-child-one/child.component";
import { ParentComponent as childToParentParentComponent } from "./components/child-to-parent/parent.component";

@Component({
  selector: 'app-all-about-communication',
  imports: [DividerModule, parentToChildOne, childToParentParentComponent],
  templateUrl: './all-about-communication.component.html',
  styleUrl: './all-about-communication.component.css'
})
export class AllAboutCommunicationComponent {

}
