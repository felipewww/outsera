import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListMultipleWinners } from './list-multiple-winners';
import { MoviesService } from '../../../services/movies.service';
import { YearsMultipleWinnersResponse } from '../../../services/dtos/years-multiple-winners.dto';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ListMultipleWinners Component', () => {
  let component: ListMultipleWinners;
  let fixture: ComponentFixture<ListMultipleWinners>;
  let mockMoviesService: jasmine.SpyObj<MoviesService>;

  const mockMultipleWinnersData: YearsMultipleWinnersResponse = {
    years: [
      { year: 1986, winnerCount: 2 },
      { year: 1990, winnerCount: 3 },
      { year: 2000, winnerCount: 2 },
    ],
  };

  beforeEach(async () => {
    mockMoviesService = jasmine.createSpyObj<MoviesService>('MoviesService', ['yearsWithMultipleWinners']);

    await TestBed.configureTestingModule({
      imports: [
        ListMultipleWinners,
      ],
      providers: [
        provideHttpClientTesting(),
        { provide: MoviesService, useValue: mockMoviesService },
      ],
    }).compileComponents();

    mockMoviesService.yearsWithMultipleWinners.and.returnValue(of(mockMultipleWinnersData));

    fixture = TestBed.createComponent(ListMultipleWinners);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tableHeader correctly', () => {
    expect(component.tableHeader.length).toBe(2);
    expect(component.tableHeader[0].label).toBe('Year');
    expect(component.tableHeader[1].label).toBe('Wins Count');
  });

  it('should call movieService.yearsWithMultipleWinners on construction and update movies signal', () => {
    expect(mockMoviesService.yearsWithMultipleWinners).toHaveBeenCalled();
    expect(component.movies()).toEqual(mockMultipleWinnersData);
  });

  it('should map years data to table format', () => {
    const mappedData = component.mapYearToTableData();

    expect(mappedData.length).toBe(3);
    expect(mappedData[0]).toEqual(['1986', '2']);
    expect(mappedData[1]).toEqual(['1990', '3']);
    expect(mappedData[2]).toEqual(['2000', '2']);
  });

  it('should handle empty years list gracefully', () => {
    mockMoviesService.yearsWithMultipleWinners.and.returnValue(of({ years: [] }));

    fixture = TestBed.createComponent(ListMultipleWinners);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(mockMoviesService.yearsWithMultipleWinners).toHaveBeenCalled();
    expect(component.movies()).toEqual({ years: [] });
    const mappedData = component.mapYearToTableData();
    expect(mappedData.length).toBe(0);
  });
});
