import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { FormStateService } from '../form-state.service';
import {
  CanvasItem,
  FormGroupItem,
} from '../models/canvas-item.model';
import { ToolboxItem } from '../models/toolbox-item.model';
import { ButtonDemoComponent } from "../../../shared/components/button/button-demo/button-demo.component";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [CommonModule, DragDropModule, ButtonModule],
  // We will use a recursive template via ng-template
  templateUrl:'./canvas.component.html',
  styleUrl: './canvas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasComponent {
  readonly formState = inject(FormStateService);
  private lastId = 0;

  onDrop(event: CdkDragDrop<CanvasItem[]>, targetGroup?: FormGroupItem): void {
    if (event.previousContainer === event.container) {
      // Item was moved within the same list (reordering)
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.formState.updateItems([...this.formState.canvasItems()]);
    } else {
      // Item was dropped from the toolbox (a new item)
      const toolboxItem = event.item.data as ToolboxItem;
      const newItem = {
        ...toolboxItem.build(),
        id: `${toolboxItem.type}-${++this.lastId}`,
      } as CanvasItem;
      
      const targetList = targetGroup ? targetGroup.children : this.formState.canvasItems();
      targetList.splice(event.currentIndex, 0, newItem);
      
      this.formState.updateItems([...this.formState.canvasItems()]);
    }
  }

  /**
   * Recursively removes an item by id from the canvas (including nested groups)
   */
  private removeItemById(items: CanvasItem[], id: string): CanvasItem[] {
    return items
      .filter(item => item.id !== id)
      .map(item =>
        item.type === 'form-group'
          ? { ...item, children: this.removeItemById(item.children, id) }
          : item
      );
  }

  deleteControl(item: CanvasItem): void {
    const updated = this.removeItemById(this.formState.canvasItems(), item.id);
    this.formState.updateItems(updated);
  }
}