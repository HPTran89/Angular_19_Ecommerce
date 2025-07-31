// A union type for all possible items on the canvas
export type CanvasItem =
  | FormTextInputItem
  | FormCheckboxItem
  | FormLabelItem
  | FormGroupItem
  | GridLayoutItem
  | FormGroupItem
  | FormRadioItem
  // | FormURLItem
  | FormTelItem
  | FormEmailItem
  | FormNumberItem
  | FormRangeItem
  | FormTextareaItem
  // | FormSelectBoxItem
  | FormDatePickerItem
  | FormFilePickerItem
  // | FormAutoCompleteBoxItem

// The different types of items, used for rendering and logic
export type CanvasItemType =
  | 'text-input'
  | 'checkbox'
  | 'label'
  | 'form-group'
  | 'grid-layout'
  | 'radio'
  | 'url'
  | 'tel'
  | 'email'
  | 'number'
  | 'range'
  | 'textarea'
  | 'select-box'
  | 'date'
  | 'file'
  | 'autocomplete-box'

// Base interface with common properties for all canvas items
export interface BaseCanvasItem {
  baseCanvasItemId: string; // Unique identifier
  type: CanvasItemType;
  name?: string;
  value?: string;
  required?: boolean,
  title?: string,
  tabIndex?: number,
}

// Specific item types 
export interface FormTextInputItem extends BaseCanvasItem {
  type: 'text-input';
  label: string;
  formControlName: string;
  placeholder: string;
  pattern: string;
  maxlength: number;
  minlength?: number;
  autocomplete?: string;
  readonly?: boolean;
  disabled?: boolean;
  autofocus?: boolean;
  spellcheck?: boolean;
  size?: number;
  inputmode?: string;
  required?: boolean;
}

export interface FormCheckboxItem extends BaseCanvasItem {
  type: 'checkbox';
  formControlName: string;
  label: string;
  checked?: boolean;
  // disabled?: boolean;
  // required?: boolean;
  // indeterminate?: boolean;
}

export interface FormLabelItem extends BaseCanvasItem {
  type: 'label';
  text: string;
  htmlFor?: string;
}

export interface FormGroupItem extends BaseCanvasItem {
  type: 'form-group';
  formGroupName: string;
  // A form group can contain other items, enabling nesting
  children: CanvasItem[];
}

export interface GridLayoutItem extends BaseCanvasItem {
  type: 'grid-layout';
  columns: number; // The number of columns in the grid
  rows: number;
  children: CanvasItem[]; // The controls nested inside the grid
}

export interface FormRadioItem extends BaseCanvasItem {
  type: 'radio';
  formControlName: string;
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
}

export interface FormTelItem extends BaseCanvasItem {
  type: 'tel';
  formControlName: string;
  label: string;
  placeholder?: string;
  pattern?: string;
  autocomplete?: string;
  readonly?: boolean;
  disabled?: boolean;
  required?: boolean;
}

export interface FormEmailItem extends BaseCanvasItem {
  type: 'email';
  formControlName?: string;
  placeholder?: string;
  autocomplete?: string;
  multiple?: boolean;
  pattern?: string;
  readonly?: boolean;
  disabled?: boolean;
  required?: boolean;
}

export interface FormNumberItem extends BaseCanvasItem {
  type: 'number';
  formControlName: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  autocomplete?: string;
  readonly?: boolean;
  disabled?: boolean;
  required?: boolean;
}

export interface FormRangeItem extends BaseCanvasItem {
  type: 'range';
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
  required?: boolean;
}
export interface FormDatePickerItem extends BaseCanvasItem {
  type: 'date';
  formControlName?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  required?: boolean;
}
export interface FormFilePickerItem extends BaseCanvasItem {
  type: 'file';
  accept: string;
  multiple?: boolean;
  capture?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface FormTextareaItem extends BaseCanvasItem {
  type: 'textarea';
  cols?: number;
  rows?: number;
  placeholder?: string;
  maxlength?: number;
  minlength?: number;
  readonly?: boolean;
  disabled?: boolean;
  required?: boolean;
  autocomplete?: string;
}