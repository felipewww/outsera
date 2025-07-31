import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pagination } from './pagination';

describe('Pagination Component', () => {
  let component: Pagination;
  let fixture: ComponentFixture<Pagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pagination],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(Pagination);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize currentPage to 1', () => {
    expect(component.getCurrentPage()).toEqual(0);
  });

  it('should initialize totalPages to 1', () => {
    expect((component as any).totalPages()).toBe(1);
  });

  it('should initialize pages as an empty array', () => {
    expect((component as any).pages()).toEqual([]);
  });

  describe('upgradePages', () => {
    it('should update totalPages and call genPages', () => {
      spyOn(component as any, 'genPages'); // Still need to cast for private methods
      component.upgradePages(5);
      expect((component as any).totalPages()).toBe(5);
      expect((component as any).genPages).toHaveBeenCalled();
    });

    it('should generate correct page numbers when totalPages is greater than 1', () => {
      component.upgradePages(3);
      expect((component as any).pages()).toEqual([1, 2]);
    });
  });

  describe('changePage', () => {
    it('should update currentPage and emit pageChange event', () => {
      spyOn(component.pageChange, 'emit');
      // @ts-ignore
      component.changePage(3);
      expect(component.getCurrentPage()).toEqual(2);
      expect(component.pageChange.emit).toHaveBeenCalledWith(3);
    });
  });

  describe('reset', () => {
    beforeEach(() => {
      // Cast to any when setting protected signals
      (component as any).currentPage.set(5);
      (component as any).totalPages.set(10);
      (component as any).pages.set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('should reset currentPage to 0', () => {
      component.reset();
      expect(component.getCurrentPage()).toEqual(0);
    });
  });

  describe('getCurrentPage', () => {
    it('should return the current value of currentPage signal', () => {
      (component as any).currentPage.set(7);
      expect(component.getCurrentPage()).toBe(6);
    });
  });
});
