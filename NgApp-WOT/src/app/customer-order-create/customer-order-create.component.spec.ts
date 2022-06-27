import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderCreateComponent } from './customer-order-create.component';

describe('CustomerOrderCreateComponent', () => {
  let component: CustomerOrderCreateComponent;
  let fixture: ComponentFixture<CustomerOrderCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOrderCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
