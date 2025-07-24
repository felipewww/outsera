import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStudios } from './top-studios';

describe('TopStudios', () => {
  let component: TopStudios;
  let fixture: ComponentFixture<TopStudios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopStudios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopStudios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
