import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ToolboxItem } from '../models/toolbox-item.model';
import { CanvasItem } from '../models/canvas-item.model';

let controlId = 0;

@Component({
  selector: 'app-toolbox',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './toolbox.component.html',
  styleUrl: './toolbox.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolboxComponent {
  readonly toolboxItems = signal<ToolboxItem[]>([
    {
      name: 'Text Input',
      type: 'text-input',
      build: () => {
        const id = ++controlId;
        return {
          type: 'text-input',
          label: `Text Input ${id}`,
          placeholder: 'Enter value...',
          formControlName: `textInput${id}`,
        };
      },
    },
    {
      name: 'Checkbox',
      type: 'checkbox',
      build: () => {
        const id = ++controlId;
        return {
          type: 'checkbox',
          label: `Checkbox ${id}`,
          formControlName: `checkbox${id}`,
        };
      },
    },
    {
      name: 'Label / Text',
      type: 'label',
      build: () => ({
        type: 'label',
        text: 'This is a label',
      }),
    },
    {
      name: 'Form Group',
      type: 'form-group',
      build: () => {
        const id = ++controlId;
        return {
          type: 'form-group',
          formGroupName: `formGroup${id}`,
          children: [],
        };
      },
    },
  ]);
}