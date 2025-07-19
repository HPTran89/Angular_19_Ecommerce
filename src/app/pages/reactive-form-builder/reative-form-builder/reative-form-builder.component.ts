import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToolboxComponent } from '../toolbox/toolbox.component';
import { CanvasComponent } from '../canvas/canvas.component';
import { FormPreviewComponent } from '../form-preview/form-preview.component';

@Component({
  selector: 'app-reative-form-builder',
  imports: [CommonModule, ToolboxComponent, CanvasComponent, FormPreviewComponent],
  templateUrl: './reative-form-builder.component.html',
  styleUrl: './reative-form-builder.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReativeFormBuilderComponent {

}
