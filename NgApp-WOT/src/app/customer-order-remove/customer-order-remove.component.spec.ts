import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderRemoveComponent } from './customer-order-remove.component';

describe('CustomerOrderRemoveComponent', () => {
  let component: CustomerOrderRemoveComponent;
  let fixture: ComponentFixture<CustomerOrderRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOrderRemoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
