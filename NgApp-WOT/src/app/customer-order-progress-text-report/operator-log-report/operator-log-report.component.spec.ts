import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorLogReportComponent } from './operator-log-report.component';

describe('OperatorLogReportComponent', () => {
  let component: OperatorLogReportComponent;
  let fixture: ComponentFixture<OperatorLogReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorLogReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorLogReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
