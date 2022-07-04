import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderDetailsModalComponent } from './customer-order-details-modal.component';

describe('CustomerOrderDetailsModalComponent', () => {
  let component: CustomerOrderDetailsModalComponent;
  let fixture: ComponentFixture<CustomerOrderDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOrderDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
