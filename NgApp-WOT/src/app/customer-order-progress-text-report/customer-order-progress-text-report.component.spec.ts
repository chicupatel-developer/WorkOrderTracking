import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderProgressTextReportComponent } from './customer-order-progress-text-report.component';

describe('CustomerOrderProgressTextReportComponent', () => {
  let component: CustomerOrderProgressTextReportComponent;
  let fixture: ComponentFixture<CustomerOrderProgressTextReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOrderProgressTextReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderProgressTextReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
