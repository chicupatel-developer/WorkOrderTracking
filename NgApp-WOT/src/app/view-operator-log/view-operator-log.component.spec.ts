import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOperatorLogComponent } from './view-operator-log.component';

describe('ViewOperatorLogComponent', () => {
  let component: ViewOperatorLogComponent;
  let fixture: ComponentFixture<ViewOperatorLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOperatorLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOperatorLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
