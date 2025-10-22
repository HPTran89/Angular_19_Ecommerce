import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragStart,
  CdkDropList,
  copyArrayItem,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormStateService } from '../form-state.service';
import {
  CanvasItem,
  FormGroupItem,
} from '../models/canvas-item.model';
import { ToolboxItem } from '../models/toolbox-item.model';
import { ButtonDemoComponent } from "../../../shared/components/button/button-demo/button-demo.component";
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [CommonModule, DragDropModule, ButtonModule, NgTemplateOutlet, TooltipModule],
  // We will use a recursive template via ng-template
  templateUrl:'./canvas.component.html',
  styleUrl: './canvas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasComponent {
  readonly formState = inject(FormStateService);
  private lastId = 0;
  
  /**
   * THE FIX: A computed signal that generates a list of ALL drop zone IDs
   * currently rendered on the canvas.
   */
  readonly allDropListIds = computed(() => {
    const listIds: string[] = ['canvas-list']; // Start with the main list
    
    // Recursive function to find all nested list IDs
    const findGroupIds = (items: CanvasItem[]) => {
      for (const item of items) {
        if (item.type === 'form-group') {
          listIds.push(item.id);
          findGroupIds(item.children); // Recurse
        }
      }
    };

    findGroupIds(this.formState.canvasItems());
    return listIds;
  });

  // The predicate function is still correct and necessary.
  canDropIntoGroup = (drag: CdkDrag, drop: CdkDropList): boolean => {
    // This should now fire correctly.
    return drag.data.type !== 'form-group';
  };
  
  // The onDrop and deleteItem functions are correct and do not need to be changed.
  // deleteItem(itemId: string): void {
  //   this.formState.deleteItem(itemId);
  // }

  onDrop(event: CdkDragDrop<CanvasItem[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (event.previousContainer.id === 'toolbox-list') {
      const toolboxItem = event.item.data as any;
      const newItem: CanvasItem = {
        ...toolboxItem.build(),
        id: `${toolboxItem.type}-${++this.lastId}`,
      };
      event.container.data.splice(event.currentIndex, 0, newItem);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.formState.updateCanvas([...this.formState.canvasItems()]);
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
    this.formState.updateCanvas(updated);
  }
}