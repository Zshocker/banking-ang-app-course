import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferResultComponent } from './transfer-result.component';

describe('TransferResultComponent', () => {
  let component: TransferResultComponent;
  let fixture: ComponentFixture<TransferResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
