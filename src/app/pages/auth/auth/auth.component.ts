import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, ReactiveFormsModule, PasswordModule, ButtonModule, InputTextModule, FloatLabel],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  authForm: FormGroup;
  isSignUpMode: boolean = false;
  @Output() visibleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: [''],
      lastName: [''],
      address: [''],
      zip: [''],
      state: [''],
    });
  }

  // toggle between sign-in and sign-up
  toggleMode() {
    this.isSignUpMode = !this.isSignUpMode;

    if (this.isSignUpMode) {
      // Add validators for sign up fields
      this.authForm.get('firstName')?.setValidators(Validators.required);
      this.authForm.get('lastName')?.setValidators([Validators.required]);
      this.authForm.get('zip')?.setValidators(Validators.required);
      this.authForm.get('state')?.setValidators(Validators.required);
    } else {// Remove validators for Sign Up fields
      this.authForm.get('firstName')?.clearValidators();
      this.authForm.get('lastName')?.clearValidators();
      this.authForm.get('address')?.clearValidators();
      this.authForm.get('zip')?.clearValidators();
      this.authForm.get('state')?.clearValidators();
    }

    this.authForm.get('firstName')?.updateValueAndValidity();
    this.authForm.get('lastName')?.updateValueAndValidity();
    this.authForm.get('address')?.updateValueAndValidity();
    this.authForm.get('zip')?.updateValueAndValidity();
    this.authForm.get('state')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.authForm.valid) {
      if (this.isSignUpMode) {
        console.log('Sign Up Data:', this.authForm.value);
      } else {
        console.log('Sign In Data:', this.authForm.value);
      }
    }
  }

  closeDialog() {
    this.authForm.reset();
    this.isSignUpMode = false;
    this.visibleEmitter.emit(false);
  }
}
