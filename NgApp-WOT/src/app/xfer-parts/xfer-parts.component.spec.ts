import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XferPartsComponent } from './xfer-parts.component';

describe('XferPartsComponent', () => {
  let component: XferPartsComponent;
  let fixture: ComponentFixture<XferPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XferPartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XferPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
