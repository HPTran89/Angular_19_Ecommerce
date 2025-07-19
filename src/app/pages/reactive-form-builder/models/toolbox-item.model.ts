import { CanvasItem, CanvasItemType } from './canvas-item.model';

// Defines a template for creating a new CanvasItem
export interface ToolboxItem {
  name: string;
  type: CanvasItemType;
  // A factory function to create a new instance of a canvas item
  build: () => Omit<CanvasItem, 'id'>;
}