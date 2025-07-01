import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ParentComponent as parentToChildOne } from './components/parent-to-child-one/parent.component';
import { ChildComponent } from './components/parent-to-child-one/child.component';
import { ParentComponent as childToParentParentComponent } from './components/child-to-parent/parent.component';
import { MydumbserviceService } from '../../shared/services/mydumbservice.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { ParentComponent } from "./components/parent-to-child-two/parent.component";

@Component({
  selector: 'app-all-about-communication',
  imports: [DividerModule, parentToChildOne, childToParentParentComponent, ParentComponent],
  templateUrl: './all-about-communication.component.html',
  styleUrl: './all-about-communication.component.css',
})
export class AllAboutCommunicationComponent implements OnInit, OnDestroy {
  // myDumbService = inject(MydumbserviceService);
  behaviorSub!: Subscription;
  regSub!: Subscription;
  replaySub!: Subscription;
  myVal!: number;

  constructor(private myDumbService: MydumbserviceService) {}

  ngOnInit(): void {
    // this.behaviorSub = this.myDumbService.mySubject2.subscribe({
    //   next: (value) => {
    //     console.log('From behavior subject:', value);
    //   },
    //   complete: () => {
    //     console.log('Complete:');
    //     // this.behaviorSub.unsubscribe();
    //   },
    //   error: (err:any) => {
    //     console.error(err);
    //   }
    // });

    // this.regSub = this.myDumbService.mySubject$.subscribe((value) => {
    //   console.log('From regular subject: ', value);
    //   this.myVal = value;
    // });
    // this.replaySub = this.myDumbService.replaySubject.subscribe(value => {
    //   console.log('From Replay Subject: ', value)
    // })
    // // this.myDumbService.fetchData();
    // console.log('myVal: ', this.myVal); // if myVal is undefined because the subject has already emitted it's value. You need to call fetchData() again to get the value
  }

  ngOnDestroy(): void {
    // this.behaviorSub.unsubscribe();
    // this.regSub.unsubscribe();
    // this.replaySub.unsubscribe();
  }
}
