import { Injectable, computed, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { CanvasItem, FormGroupItem } from './models/canvas-item.model';

// Helper function to recursively find all drop list IDs
function getDropListIds(items: CanvasItem[]): string[] {
  let ids: string[] = [];
  for (const item of items) {
    if (item.type === 'form-group' || item.type === 'grid-layout') {
      ids.push(item.id);
      ids = ids.concat(getDropListIds(item.children));
    }
  }
  return ids;
}

@Injectable({
  providedIn: 'root',
})
export class FormStateService {
  private readonly fb = new FormBuilder();

  // The single source of truth for the canvas layout
  readonly canvasItems = signal<CanvasItem[]>([]);

  // A derived signal that automatically builds a Reactive Form from the canvas items
  readonly formGroup = computed(() => this.buildFormGroup(this.canvasItems()));

  // A derived signal to easily get the form's value
  readonly formValue = computed(() => this.formGroup().value);

  /**
  * A derived signal that holds all canvas-side drop list IDs,
  * including the main canvas and all nested groups.
  */
  readonly canvasDropListIds = computed(() => {
    const nestedIds = getDropListIds(this.canvasItems());
    return ['canvas-list', ...nestedIds];
  });


  /**
   * Replaces the entire canvas item list. Used by the drag-drop functionality.
   */
  updateItems(items: CanvasItem[]): void {
    this.canvasItems.set(items);
  }

  /**
   * Recursively builds an Angular FormGroup from the canvas item structure.
   */
  private buildFormGroup(items: CanvasItem[]): FormGroup {
    const groupControls: { [key: string]: AbstractControl } = {};

    for (const item of items) {
      switch (item.type) {
        case 'text-input':
        case 'checkbox':
          // Add a new FormControl for input types
          groupControls[item.formControlName] = new FormControl(
            item.type === 'checkbox' ? false : null
          );
          break;
        case 'form-group':
          // Recursively build a nested FormGroup
          groupControls[item.formGroupName] = this.buildFormGroup(
            item.children
          )
          break;
        case 'grid-layout':
          // A grid is for visual layout. We don't create a control for it.
          // Instead, we recursively process its children and add them to the *current* group.
          const gridChildrenControls = this.buildFormGroup(item.children).controls;
          Object.assign(groupControls, gridChildrenControls);
          break;
        // 'label' items do not have a corresponding form control, so we ignore them.
        case 'label':
          break;
      }
    }
    return this.fb.group(groupControls);
  }
}