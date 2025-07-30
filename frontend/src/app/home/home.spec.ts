import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';
import {HttpClientTestingModule, provideHttpClientTesting} from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import {of} from 'rxjs';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        Home
      ],
      providers: [
        // provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
