import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOperatorLogComponent } from './create-operator-log.component';

describe('CreateOperatorLogComponent', () => {
  let component: CreateOperatorLogComponent;
  let fixture: ComponentFixture<CreateOperatorLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOperatorLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOperatorLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
