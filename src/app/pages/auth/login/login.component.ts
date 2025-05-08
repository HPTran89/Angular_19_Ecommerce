import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog'
import { AuthComponent } from "../auth/auth.component";

@Component({
  selector: 'app-login',
  imports: [Dialog, ButtonModule, InputTextModule, AuthComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  visible: boolean = false;
  // cdr = inject(ChangeDetectorRef);

  constructor() {}

  showDialog() {
    this.visible = true;
  }

  closeDialog(data: any) {
    this.visible = !this.visible ;
  }



}
