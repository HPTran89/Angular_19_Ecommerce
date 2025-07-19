import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormStateService } from '../form-state.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-preview',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-preview.component.html',
  styleUrl: './form-preview.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPreviewComponent {
  readonly formState = inject(FormStateService);
}