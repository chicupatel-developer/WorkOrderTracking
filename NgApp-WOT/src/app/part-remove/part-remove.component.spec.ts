import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartRemoveComponent } from './part-remove.component';

describe('PartRemoveComponent', () => {
  let component: PartRemoveComponent;
  let fixture: ComponentFixture<PartRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartRemoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
