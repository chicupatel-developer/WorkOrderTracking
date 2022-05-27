import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartUploadComponent } from './part-upload.component';

describe('PartUploadComponent', () => {
  let component: PartUploadComponent;
  let fixture: ComponentFixture<PartUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
