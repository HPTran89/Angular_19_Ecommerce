// A union type for all possible items on the canvas.
// This allows the canvas to contain any supported form element or group.
export type CanvasItem =
  | FormInputItem
  | FormCheckboxItem
  | FormLabelItem
  | FormGroupItem;

// The different types of items, used for rendering and logic.
// Extend this type when adding new form elements.
export type CanvasItemType =
  | 'text-input'
  | 'checkbox'
  | 'radio'
  | 'datepicker'
  | 'label'
  | 'form-group';

// Base interface with common properties for all canvas items.
// All items must have a unique id and a type.
export interface BaseCanvasItem {
  id: string; // Unique identifier for the item (used for tracking and updates)
  type: CanvasItemType; // The type of the item (determines rendering and behavior)
}

// Represents a text input field on the canvas.
export interface FormInputItem extends BaseCanvasItem {
  type: 'text-input';
  label: string; // The label displayed for the input
  placeholder: string; // Placeholder text inside the input
  formControlName: string; // Name used for form control binding
}

// Represents a checkbox field on the canvas.
export interface FormCheckboxItem extends BaseCanvasItem {
  type: 'checkbox';
  label: string; // The label displayed for the checkbox
  formControlName: string; // Name used for form control binding
}

// Represents a static label (non-interactive) on the canvas.
export interface FormLabelItem extends BaseCanvasItem {
  type: 'label';
  text: string; // The text content of the label
}

// Represents a group of form items, enabling nesting and logical grouping.
// Children can be any CanvasItem, including other groups.
export interface FormGroupItem extends BaseCanvasItem {
  type: 'form-group';
  formGroupName: string; // Name used for grouping controls in the form
  children: CanvasItem[]; // Nested items within the group
}