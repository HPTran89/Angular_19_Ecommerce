import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ToolboxItem } from '../models/toolbox-item.model';

let controlId = 0;

@Component({
  selector: 'app-toolbox',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './toolbox.component.html',
  styleUrl: './toolbox.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolboxComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.toolboxItems())
  }
  readonly toolboxItems = signal<ToolboxItem[]>([
    {
      name: 'Grid Layout',
      type: 'grid-layout',
      build: () => ({
        type: 'grid-layout',
        columns: 2, // Default to a 2-column layout
        rows: 3,
        children: [],
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
          title: "Add your tooltip here",
          pattern: '', // Add a default pattern or set as needed
          maxlength: 255 // Add a default maxlength or set as needed
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
      build: () => {
        return {
          type: 'label',
          text: 'Use as placeholder for your text',
        }
      },
    },
    {
      name: 'radio',
      type: 'radio',
      build: () => {
        const id = ++controlId;
        return {
          type: 'radio',
          label: `Radio ${id}`,
          formControlName: `radio${id}`,
          name: `radio${id}`,
          value: `radio${id}`,
        }
      }
    },
    {
      name: 'Tel',
      type: 'tel',
      build: () => {
        const id = ++controlId;
        return {
          type: 'tel',
          label: `Tel ${id}`,
          formControlName: `tel${id}`,
          autocomplete: "false"
        };
      }
    },
    {
      name: 'Email',
      type: 'email',
      build: () => {
        const id = ++controlId;
        return {
          type: 'email',
        };
      }
    },
    {
      name: 'Range',
      type: 'range',
      build: () => {
        const id = ++controlId;
        return {
          type: 'range',
          min: 0,
          max: 100,
          step: 1
        };
      }
    },
    {
      name: 'Textarea',
      type: 'textarea',
      build: () => {
        const id = ++controlId;
        return {
          type: 'textarea',
          cols: 30,
          rows: 5
        };
      }
    },
    {
      name: 'Date Picker',
      type: 'date',
      build: () => {
        const id = ++controlId;
        return {
          type: 'date',
        };
      }
    },
    {
      name: 'File Picker',
      type: 'file',
      build: () => {
        const id = ++controlId;
        return {
          type: 'file',
          accept: '*/*'
        };
      }
    },
    {
      name: 'number',
      type: 'number',
      build: () => {
        const id = ++controlId;
        return {
          type: 'number',
          formControlName: `number${id}`,
        }
      }
    },
  ]);
}