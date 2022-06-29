import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderReportComponent } from './customer-order-report.component';

describe('CustomerOrderReportComponent', () => {
  let component: CustomerOrderReportComponent;
  let fixture: ComponentFixture<CustomerOrderReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOrderReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
