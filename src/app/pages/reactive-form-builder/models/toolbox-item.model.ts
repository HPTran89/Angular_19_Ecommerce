import {
  CanvasItemType,
  FormTextInputItem,
  FormCheckboxItem,
  FormLabelItem,
  FormGroupItem,
  FormRadioItem,
  FormTelItem,
  FormEmailItem,
  FormNumberItem,
  FormRangeItem,
  FormTextareaItem,
  FormDatePickerItem,
  FormFilePickerItem,
  GridLayoutItem
} from './canvas-item.model';

// Defines a template for creating a new CanvasItem
export interface ToolboxItem {
  name: string;
  type: CanvasItemType;
  // A factory function to create a new instance of a canvas item
  build: () => (
    Omit<FormTextInputItem, "baseCanvasItemId"> |
    Omit<FormCheckboxItem, "baseCanvasItemId"> |
    Omit<FormLabelItem, "baseCanvasItemId"> |
    Omit<FormGroupItem, "baseCanvasItemId"> |
    Omit<FormRadioItem, "baseCanvasItemId"> |
    Omit<FormTelItem, "baseCanvasItemId"> |
    Omit<FormEmailItem, "baseCanvasItemId"> |
    Omit<FormNumberItem, "baseCanvasItemId"> |
    Omit<FormRangeItem, "baseCanvasItemId"> |
    Omit<FormTextareaItem, "baseCanvasItemId"> |
    Omit<FormDatePickerItem, "baseCanvasItemId"> |
    Omit<FormFilePickerItem, "baseCanvasItemId"> |
    Omit<GridLayoutItem, "baseCanvasItemId">
  );
}