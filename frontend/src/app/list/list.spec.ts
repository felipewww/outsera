import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import { List } from './list';
import { MoviesService } from '../../services/movies.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {mockMoviesResponse} from '../../test/movies-service.mock';
import {of} from 'rxjs';
import {Pagination} from '../../components/pagination/pagination';
import {MovieItem} from '../../services/dtos/list-movies.dto';

describe('List', () => {
  let component: List;
  let fixture: ComponentFixture<List>;
  let mockMoviesService: jasmine.SpyObj<MoviesService>;


  beforeEach(async () => {
    mockMoviesService = jasmine.createSpyObj<MoviesService>('MoviesService', ['list']);
    mockMoviesService.list.and.returnValue(of(mockMoviesResponse));

    await TestBed.configureTestingModule({
      imports: [List],
      providers: [
        provideHttpClientTesting(),
        { provide: MoviesService, useValue: mockMoviesService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(List);
    component = fixture.componentInstance;
    component.paginationComponent = new Pagination();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tableHeader correctly', () => {
    expect(component.tableHeader.length).toBe(4);
    expect(component.tableHeader[1].label).toBe('Year');
    expect(component.tableHeader[3].label).toBe('Winner');
    expect(component.tableHeader[3].filter?.options?.length).toBe(3);
  });

  it('should initialize filters signal', () => {
    expect(component.filters()).toEqual({ page: 1, size: 10 });
  });

  it('should initialize filtersCols signal', () => {
    expect(component.filtersCols()).toEqual({ Year: '', Winner: '' });
  });

  describe('ngAfterViewInit', () => {
    it('should call search()', fakeAsync(() => {
      // Spy on search before ngAfterViewInit is called
      spyOn(component, 'search');
      // Re-detect changes to trigger ngAfterViewInit
      fixture.detectChanges();
      // ngAfterViewInit is called after initial detectChanges, but we need to ensure
      // the ViewChild is available before the spy is set up.
      // So, we trigger detectChanges again after the spy is set up to ensure ngAfterViewInit runs.
      // This is a common pattern for testing ngAfterViewInit.
      component.ngAfterViewInit(); // Manually call it for testing if fixture.detectChanges() doesn't trigger it reliably in test setup
      expect(component.search).toHaveBeenCalled();
    }));
  });

  describe('mapToTable', () => {
    it('should correctly map MovieItem[] to string[][]', () => {
      const mockMovies: MovieItem[] = [
        { id: 101, year: 2020, title: 'Great Film', winner: true, studios: [], producers: [] },
        { id: 102, year: 2021, title: 'Another One', winner: false, studios: [], producers: [] },
        { id: 103, year: 2022, title: 'No Winner Here', winner: false, studios: [], producers: [] },
      ];
      component.movies.set(mockMovies); // Set the signal value

      const mappedData = component.mapToTable();

      expect(mappedData.length).toBe(3);
      expect(mappedData[0]).toEqual(['101', '2020', 'Great Film', 'Yes']);
      expect(mappedData[1]).toEqual(['102', '2021', 'Another One', 'No']);
      expect(mappedData[2]).toEqual(['103', '2022', 'No Winner Here', 'No']);
    });
  });

  describe('searchPage', () => {
    let searchSpy: jasmine.Spy;
    let getCurrentPageSpy: jasmine.Spy;

    beforeEach(() => {
      component.paginationComponent = new Pagination();
      searchSpy = spyOn(component, 'search');
      getCurrentPageSpy = spyOn(component.paginationComponent, 'getCurrentPage').and.returnValue(3);
    });

    it('should update filters page and call search()', () => {
      component.searchPage();
      expect(getCurrentPageSpy).toHaveBeenCalled();
      expect(component.filters().page).toBe(3);
      expect(searchSpy).toHaveBeenCalled();
    });
  });

  describe('searchWithFilters', () => {
    let searchSpy: jasmine.Spy;
    let paginationResetSpy: jasmine.Spy;

    beforeEach(() => {
      component.paginationComponent = new Pagination();
      searchSpy = spyOn(component, 'search');
      paginationResetSpy = spyOn(component.paginationComponent, 'reset');

      // Reset filters to a known state for each test
      component.filters.set({ page: 1, size: 10, winner: true, year: '1999' });
      component.filtersCols.set({ Year: '', Winner: '' });
    });

    it('should reset pagination and call search', () => {
      component.searchWithFilters();
      expect(paginationResetSpy).toHaveBeenCalled();
      expect(searchSpy).toHaveBeenCalled();
    });

    it('should apply Year filter if present', () => {
      component.filtersCols.set({ Year: '2023', Winner: '' });
      component.searchWithFilters();
      expect(component.filters().year).toBe('2023');
      expect(component.filters().winner).toBeUndefined(); // Should be deleted if empty
    });

    it('should apply Winner filter if present', () => {
      component.filtersCols.set({ Year: '', Winner: 'true' });
      component.searchWithFilters();
      expect(component.filters().winner).toBe(true);
      expect(component.filters().year).toBeUndefined(); // Should be deleted if empty
    });

    it('should apply both Year and Winner filters if present', () => {
      component.filtersCols.set({ Year: '2023', Winner: 'false' });
      component.searchWithFilters();
      expect(component.filters().year).toBe('2023');
      expect(component.filters().winner).toBe(false);
    });

    it('should delete filters if filtersCols values are empty/whitespace', () => {
      component.filtersCols.set({ Year: '   ', Winner: ' ' }); // Whitespace
      component.searchWithFilters();
      expect(component.filters().year).toBeUndefined();
      expect(component.filters().winner).toBeUndefined();
    });

    it('should delete existing filters if filtersCols values become empty', () => {
      component.filters.set({ page: 1, size: 10, year: '2000', winner: true });
      component.filtersCols.set({ Year: '', Winner: '' });

      component.searchWithFilters();

      expect(component.filters().year).toBeUndefined();
      expect(component.filters().winner).toBeUndefined();
    });
  });
});
