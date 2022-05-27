import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartImageUploadComponent } from './part-image-upload.component';

describe('PartImageUploadComponent', () => {
  let component: PartImageUploadComponent;
  let fixture: ComponentFixture<PartImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartImageUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
