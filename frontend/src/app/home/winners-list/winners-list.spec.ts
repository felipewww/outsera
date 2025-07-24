import {ComponentFixture, TestBed, tick} from '@angular/core/testing';
import { WinnersList } from './winners-list';
import { of } from 'rxjs';
import { MoviesService } from '../../../services/movies.service';
import { Pagination } from '../../../components/pagination/pagination';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {mockMoviesResponse} from '../../../test/movies-service.mock';

describe('WinnersList Component', () => {
  let component: WinnersList;
  let fixture: ComponentFixture<WinnersList>;
  let mockMoviesService: jasmine.SpyObj<MoviesService>;

  beforeEach(async () => {
    mockMoviesService = jasmine.createSpyObj<MoviesService>('MoviesService', ['list']);

    await TestBed.configureTestingModule({
      imports: [WinnersList],
      providers: [
        provideHttpClientTesting(),
        { provide: MoviesService, useValue: mockMoviesService }, // useValue e não useClass!
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WinnersList);
    component = fixture.componentInstance;
    component.paginationComponent = new Pagination();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should map movies to table format', () => {
    component.movies.set(mockMoviesResponse.content);
    const rows = component.mapToTable();
    expect(rows.length).toBe(2);
    expect(rows[0]).toEqual(['1', '2000', 'Test Movie']);
  });

  it('should call movieService.list with correct filters and update movies and pagination', () => {
    component.paginationComponent.reset();

    spyOn(component.paginationComponent, 'getCurrentPage').and.returnValue(1);
    spyOn(component.paginationComponent, 'upgradePages');

    mockMoviesService.list.and.returnValue(of(mockMoviesResponse));
    component.year.set('2001');
    component.search();

    expect(mockMoviesService.list).toHaveBeenCalledWith({
      page: 1,
      size: 10,
      winner: true,
      year: '2001',
    });

    expect(component.movies()).toEqual(mockMoviesResponse.content);
    expect(component.paginationComponent.upgradePages).toHaveBeenCalledWith(5);
  });

  it('should reset pagination when reseting is true', () => {
    mockMoviesService.list.and.returnValue(of(mockMoviesResponse));
    spyOn(component.paginationComponent, 'reset');

    component.search(true);
    expect(component.paginationComponent.reset).toHaveBeenCalled();
  });
});
