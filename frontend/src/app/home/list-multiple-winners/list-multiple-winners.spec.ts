import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMultipleWinners } from './list-multiple-winners';

describe('ListMultipleWinners', () => {
  let component: ListMultipleWinners;
  let fixture: ComponentFixture<ListMultipleWinners>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMultipleWinners]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMultipleWinners);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
