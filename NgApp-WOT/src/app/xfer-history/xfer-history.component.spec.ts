import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XferHistoryComponent } from './xfer-history.component';

describe('XferHistoryComponent', () => {
  let component: XferHistoryComponent;
  let fixture: ComponentFixture<XferHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XferHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XferHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
