import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopStudios } from './top-studios';
import { MoviesService } from '../../../services/movies.service';
import { StudiosWinCountResponse } from '../../../services/dtos/studios-win-count.dto';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing'; // For HttpClient dependencies if MoviesService uses it

describe('TopStudios Component', () => {
  let component: TopStudios;
  let fixture: ComponentFixture<TopStudios>;
  let mockMoviesService: jasmine.SpyObj<MoviesService>;

  const mockStudiosData: StudiosWinCountResponse = {
    studios: [
      { name: 'Studio A', winCount: 10 },
      { name: 'Studio B', winCount: 8 },
      { name: 'Studio C', winCount: 5 },
      { name: 'Studio D', winCount: 3 },
      { name: 'Studio E', winCount: 2 },
    ],
  };

  beforeEach(async () => {
    mockMoviesService = jasmine.createSpyObj<MoviesService>('MoviesService', ['studiosWinCount']);

    await TestBed.configureTestingModule({
      imports: [
        TopStudios,
      ],
      providers: [
        provideHttpClientTesting(),
        { provide: MoviesService, useValue: mockMoviesService },
      ],
    }).compileComponents();

    mockMoviesService.studiosWinCount.and.returnValue(of(mockStudiosData));
    fixture = TestBed.createComponent(TopStudios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tableHeader correctly', () => {
    expect(component.tableHeader.length).toBe(2);
    expect(component.tableHeader[0].label).toBe('Name');
    expect(component.tableHeader[1].label).toBe('Wins Count');
  });

  it('should call movieService.studiosWinCount on construction and update studios signal', () => {
    expect(mockMoviesService.studiosWinCount).toHaveBeenCalled();
    expect(component.studios()).toEqual(mockStudiosData);
  });

  it('should map studios data to table format, limiting to top 3', () => {
    expect(component.studios()).toEqual(mockStudiosData);

    const mappedData = component.mapToTable();

    // Expect only the top 3 studios to be mapped
    // Should NOT include Studio D or E
    expect(mappedData.length).toBe(3);
    expect(mappedData[0]).toEqual(['Studio A', '10']);
    expect(mappedData[1]).toEqual(['Studio B', '8']);
    expect(mappedData[2]).toEqual(['Studio C', '5']);
  });

  it('should handle empty studios list gracefully', () => {
    mockMoviesService.studiosWinCount.and.returnValue(of({ studios: [] }));

    fixture = TestBed.createComponent(TopStudios);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(mockMoviesService.studiosWinCount).toHaveBeenCalled();
    expect(component.studios()).toEqual({ studios: [] });
    const mappedData = component.mapToTable();
    expect(mappedData.length).toBe(0);
  });
});
