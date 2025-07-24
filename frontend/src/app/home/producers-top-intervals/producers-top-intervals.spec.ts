import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProducersTopIntervals } from './producers-top-intervals';
import { MoviesService } from '../../../services/movies.service';
import { ProducersIntervalResponse } from '../../../services/dtos/max-min-Interval.dto';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProducersTopIntervals Component', () => {
  let component: ProducersTopIntervals;
  let fixture: ComponentFixture<ProducersTopIntervals>;
  let mockMoviesService: jasmine.SpyObj<MoviesService>;

  const mockProducerIntervals: ProducersIntervalResponse = {
    min: [
      { producer: 'Producer A', interval: 1, previousWin: 1990, followingWin: 1991 },
      { producer: 'Producer B', interval: 2, previousWin: 2000, followingWin: 2002 },
    ],
    max: [
      { producer: 'Producer C', interval: 10, previousWin: 1980, followingWin: 1990 },
      { producer: 'Producer D', interval: 15, previousWin: 2005, followingWin: 2020 },
    ]
  };

  beforeEach(async () => {
    mockMoviesService = jasmine.createSpyObj<MoviesService>('MoviesService', ['maxMinWinIntervalForProducers']);

    await TestBed.configureTestingModule({
      imports: [
        ProducersTopIntervals,
      ],
      providers: [
        provideHttpClientTesting(),
        { provide: MoviesService, useValue: mockMoviesService },
      ],
    }).compileComponents();

    mockMoviesService.maxMinWinIntervalForProducers.and.returnValue(of(mockProducerIntervals));

    fixture = TestBed.createComponent(ProducersTopIntervals);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tableHeader correctly', () => {
    expect(component.tableHeader.length).toBe(4);
    expect(component.tableHeader[0].label).toBe('Producer');
    expect(component.tableHeader[1].label).toBe('Interval');
    expect(component.tableHeader[2].label).toBe('Previous year');
    expect(component.tableHeader[3].label).toBe('Following year');
  });

  it('should call movieService.maxMinWinIntervalForProducers on construction and update intervals signal', () => {
    expect(mockMoviesService.maxMinWinIntervalForProducers).toHaveBeenCalled();
    expect(component.intervals()).toEqual(mockProducerIntervals);
  });

  it('should map max intervals to table format', () => {
    const mappedData = component.mapMaxToTable();

    expect(mappedData.length).toBe(2);
    expect(mappedData[0]).toEqual(['Producer C', '10', '1980', '1990']);
    expect(mappedData[1]).toEqual(['Producer D', '15', '2005', '2020']);
  });

  it('should map min intervals to table format', () => {
    const mappedData = component.mapMinToTable();

    expect(mappedData.length).toBe(2);
    expect(mappedData[0]).toEqual(['Producer A', '1', '1990', '1991']);
    expect(mappedData[1]).toEqual(['Producer B', '2', '2000', '2002']);
  });

  it('should handle empty min intervals gracefully', () => {
    mockMoviesService.maxMinWinIntervalForProducers.and.returnValue(of({ min: [], max: mockProducerIntervals.max }));

    fixture = TestBed.createComponent(ProducersTopIntervals);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const mappedData = component.mapMinToTable();
    expect(mappedData.length).toBe(0);
  });

  it('should handle empty max intervals gracefully', () => {
    mockMoviesService.maxMinWinIntervalForProducers.and.returnValue(of({ min: mockProducerIntervals.min, max: [] }));

    fixture = TestBed.createComponent(ProducersTopIntervals);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const mappedData = component.mapMaxToTable();
    expect(mappedData.length).toBe(0);
  });
});
