import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiStepFormComponentComponent } from './multi-step-form-component.component';

describe('MultiStepFormComponentComponent', () => {
  let component: MultiStepFormComponentComponent;
  let fixture: ComponentFixture<MultiStepFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiStepFormComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiStepFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
