import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { StepperModule } from 'primeng/stepper'
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-multi-step-form-component',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, StepperModule, DropdownModule, RadioButtonModule, CheckboxModule],
  templateUrl: './multi-step-form-component.component.html',
  styleUrl: './multi-step-form-component.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiStepFormComponentComponent {
  private fb = inject(FormBuilder);
  currentStep = signal(1);

  form = this.fb.nonNullable.group({
    personal: this.fb.nonNullable.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, this.customEmailValidator]],
      DOB: [new Date(1900, 0, 1), [Validators.required]],
      age: ['']
    }),
    peferences: this.fb.nonNullable.group({
      gender: ['male', Validators.required],
      hobbies: this.fb.nonNullable.group({
        sports: [false],
        reading: [false],
        traveling: [false]
      }),
      country: ['', Validators.required]
    }),
    terms: this.fb.nonNullable.group({
      acceptTerms: [false, Validators.requiredTrue]
    })
  });

  
 personalGroup = this.form.get('personal') as FormGroup;
 preferencesGroup = this.form.get('peferences') as FormGroup;
 hobbies = this.preferencesGroup.get('hobbies') as FormGroup;

  countries = [{label: '', value: null}, { label: 'USA', value: 'USA' }, { label: 'Canada', value: 'Canada' }, { label: 'Vietnam', value: 'Vietnam' }, { label: 'Germany', value: 'Germany' }, { label: 'Brazil', value: 'Brazil' }, { label: 'Columbia', value: 'Columbia' }];

  getPersonal() {
    return this.form.controls.personal;
  }

  getPeferences() {
    return this.form.controls.peferences;
  }

  getTerms() {
    this.form.controls.terms
  }

  nextStep() {
    if (this.currentStep() === 1 && this.getPersonal().valid) {
      let step = this.currentStep();
      this.currentStep.set(2);
    } else if (this.currentStep() === 2 && this.getPeferences().valid) {
      this.currentStep.set(3);
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.set(this.currentStep() - 1)
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.getRawValue())
    } else {
      console.warn('Form Invalid');
    }
  }

  private customEmailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && !value.endsWith('@example.com')) {
      return { invalidDomain: true };
    }
    return null;
  }
}
