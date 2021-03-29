import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSegmentComponent } from './data-segment.component';

describe('DataSegmentComponent', () => {
  let component: DataSegmentComponent;
  let fixture: ComponentFixture<DataSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataSegmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
