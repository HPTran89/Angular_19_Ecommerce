// A union type for all possible items on the canvas
export type CanvasItem =
  | FormInputItem
  | FormCheckboxItem
  | FormLabelItem
  | FormGroupItem;

// The different types of items, used for rendering and logic
export type CanvasItemType =
  | 'text-input'
  | 'checkbox'
  | 'label'
  | 'form-group';

// Base interface with common properties for all canvas items
export interface BaseCanvasItem {
  id: string; // Unique identifier
  type: CanvasItemType;
}

// Specific item types
export interface FormInputItem extends BaseCanvasItem {
  type: 'text-input';
  label: string;
  placeholder: string;
  formControlName: string;
}

export interface FormCheckboxItem extends BaseCanvasItem {
  type: 'checkbox';
  label: string;
  formControlName: string;
}

export interface FormLabelItem extends BaseCanvasItem {
  type: 'label';
  text: string;
}

export interface FormGroupItem extends BaseCanvasItem {
  type: 'form-group';
  formGroupName: string;
  // A form group can contain other items, enabling nesting
  children: CanvasItem[];
}