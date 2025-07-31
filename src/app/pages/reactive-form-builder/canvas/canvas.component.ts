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

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [CommonModule, DragDropModule, ButtonModule],
  // We will use a recursive template via ng-template
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasComponent {
  readonly formState = inject(FormStateService);
  private lastId = 0;

  onDrop(event: CdkDragDrop<CanvasItem[], any>) {
    if (this.isToolboxDrop(event)) {
      // --- THIS IS THE NEW, CORRECT LOGIC FOR TOOLBOX DROPS ---
      const toolboxItem = event.item.data as ToolboxItem;
      const newItem = {
        ...toolboxItem.build(),
        baseCanvasItemId: `${toolboxItem.type}-${++this.lastId}`,
      } as CanvasItem;

      // Manually add the new, transformed item to the target list.
      event.container.data.splice(event.currentIndex, 0, newItem);

    } else if (event.previousContainer === event.container) {
      // Reordering within the same list.
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Transferring an item between two different canvas lists.
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    // --- CRITICAL FINAL STEP ---
    // After any mutation, we must set the signal with a new, deep-cloned object
    // to ensure Angular's change detection fires correctly for nested changes.
    const newItemsState = JSON.parse(
      JSON.stringify(this.formState.canvasItems())
    );
    this.formState.updateItems(newItemsState);
  }

  /**
   * Type guard to check if an item was dragged from the toolbox.
   */
  private isToolboxDrop(
    event: CdkDragDrop<CanvasItem[], any>
  ): boolean {
    return event.previousContainer.id === 'toolbox-list';
  }

  /**
   * Recursively removes an item by id from the canvas (including nested groups)
   */
  private removeItemById(items: CanvasItem[], id: string): CanvasItem[] {
    return items
      .filter(item => item.baseCanvasItemId !== id)
      .map(item =>
        item.type === 'form-group' || item.type === 'grid-layout'
          ? { ...item, children: this.removeItemById(item.children, id) }
          : item
      );
  }

  deleteControl(item: CanvasItem): void {
    const updated = this.removeItemById(this.formState.canvasItems(), item.baseCanvasItemId);
    this.formState.updateItems(updated);
  }

  getColumnsArray(columns: number): number[] {
    return Array.from({ length: columns }, (_, i) => i);
  }

  getGridCells(rows: number, columns: number): { row: number, col: number, index: number }[][] {
    const grid =  Array.from({ length: rows }, (_, row) =>
      Array.from({ length: columns }, (_, col) => ({
        row,
        col,
        index: row * columns + col
      }))
    );
    return grid;
  }
}