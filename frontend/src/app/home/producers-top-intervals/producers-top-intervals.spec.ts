import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducersTopIntervals } from './producers-top-intervals';

describe('ProducersTopIntervals', () => {
  let component: ProducersTopIntervals;
  let fixture: ComponentFixture<ProducersTopIntervals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducersTopIntervals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducersTopIntervals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
