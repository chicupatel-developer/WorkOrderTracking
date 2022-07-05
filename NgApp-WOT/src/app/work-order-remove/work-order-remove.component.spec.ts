import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderRemoveComponent } from './work-order-remove.component';

describe('WorkOrderRemoveComponent', () => {
  let component: WorkOrderRemoveComponent;
  let fixture: ComponentFixture<WorkOrderRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrderRemoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
