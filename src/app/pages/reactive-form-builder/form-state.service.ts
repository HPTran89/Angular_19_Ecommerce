import { Injectable, computed, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { CanvasItem, FormGroupItem } from './models/canvas-item.model';

@Injectable({
  providedIn: 'root',
})
export class FormStateService {
  // Angular's FormBuilder utility for creating form controls and groups
  private readonly fb = new FormBuilder();

  /**
   * The single source of truth for the canvas layout.
   * This signal holds the entire structure of form elements (including groups and nested items).
   * All canvas operations (add, remove, reorder, etc.) should update this signal.
   *
   * NOTE: The array itself is mutable, but you should always update the signal
   * using .set() with a new array to ensure change detection and immutability.
   */
  readonly canvasItems = signal<CanvasItem[]>([]);

  /**
   * A derived signal that automatically builds a Reactive FormGroup
   * from the current canvas items structure.
   * This ensures the form structure always matches the canvas layout.
   *
   * Whenever canvasItems changes, this computed signal will re-run and
   * produce a new FormGroup instance reflecting the current state.
   */
   // --- The Fix: From computed() to signal() ---
  // Change formGroup to be a regular signal, initialized as empty.
  readonly formGroup = signal<FormGroup>(this.fb.group({}));

  /**
   * A derived signal to easily get the current value of the form.
   * This is a shortcut for accessing the form's value tree, which
   * will always be in sync with the canvas structure.
   */
  readonly formValue = computed(() => this.formGroup().value);

   /**
   * Updates the canvas items AND manually triggers the form to rebuild.
   * This is now the primary method for mutation.
   */
  updateCanvas(items: CanvasItem[]): void {
    this.canvasItems.set(items);
    this.rebuildForm(); // Manually trigger the rebuild after the state is set.
  }
  /**
   * This method contains the logic that used to be in the computed() signal.
   * It's now called manually to prevent race conditions.
   */
  private rebuildForm(): void {
    const newFormGroup = this.buildFormGroup(this.canvasItems());
    this.formGroup.set(newFormGroup);
  }

  /**
   * Recursively builds an Angular FormGroup from the canvas item structure.
   * This method walks through the canvas items array and creates the appropriate
   * FormControl or nested FormGroup for each item, based on its type.
   *
   * - For 'text-input' and 'checkbox', a FormControl is created.
   * - For 'form-group', a nested FormGroup is created recursively.
   * - 'label' items are ignored as they do not represent form controls.
   *
   * @param items The array of CanvasItem objects to convert into a FormGroup.
   * @returns A FormGroup representing the structure of the provided items.
   */
  private buildFormGroup(items: CanvasItem[]): FormGroup {
    const groupControls: { [key: string]: AbstractControl } = {};

    for (const item of items) {
      switch (item.type) {
        case 'text-input':
        case 'checkbox':
          // Add a new FormControl for input types.
          // Checkbox controls default to false, text inputs to null.
          groupControls[item.formControlName] = new FormControl(
            item.type === 'checkbox' ? false : null
          );
          break;
        case 'form-group':
          // Recursively build a nested FormGroup for grouped items.
          groupControls[item.formGroupName] = this.buildFormGroup(
            item.children
          );
          break;
        // 'label' items do not have a corresponding form control, so we ignore them.
        case 'label':
          break;
      }
    }
    // Return a FormGroup containing all controls and nested groups.
    return this.fb.group(groupControls);
  }
}