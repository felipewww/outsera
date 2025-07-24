import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Table, TableHeader } from './table';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { SimpleChanges } from '@angular/core';

describe('Table Component', () => {
  let component: Table;
  let fixture: ComponentFixture<Table>;

  // Mock data for headers and data
  const mockHeaders: TableHeader[] = [
    { label: 'ID' },
    { label: 'Name', filter: { type: 'text' } },
    { label: 'Status', filter: { type: 'options', options: [{ label: 'Active', value: 'active' }] } },
  ];

  const mockData: string[][] = [
    ['1', 'Item A', 'Active'],
    ['2', 'Item B', 'Inactive'],
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Table,
        ReactiveFormsModule,
      ],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(Table);
    component = fixture.componentInstance;

    component.headers = mockHeaders;
    component.data = mockData;
    component.filters = {};

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize filterForm in ngOnInit based on headers', () => {
    expect(component.filterForm).toBeInstanceOf(FormGroup);
    expect(Object.keys(component.filterForm.controls).length).toBe(mockHeaders.length);
    expect(component.filterForm.get('ID')).toBeInstanceOf(FormControl);
    expect(component.filterForm.get('Name')).toBeInstanceOf(FormControl);
    expect(component.filterForm.get('Status')).toBeInstanceOf(FormControl);
  });

  // it('should update hasData when data input changes', () => {
  //   // Initial state
  //   expect(component.hasData).toBeFalse();
  //
  //   // Simulate data changing to empty
  //   const changes: SimpleChanges = {
  //     data: {
  //       currentValue: [],
  //       previousValue: mockData,
  //       firstChange: false,
  //       isFirstChange: () => false
  //     }
  //   };
  //
  //   component.ngOnChanges(changes);
  //   expect(component.hasData).toBeFalse();
  //
  //   // Simulate data changing to non-empty
  //   const changes2: SimpleChanges = {
  //     data: {
  //       currentValue: mockData,
  //       previousValue: [],
  //       firstChange: false,
  //       isFirstChange: () => false
  //     }
  //   };
  //   component.ngOnChanges(changes2);
  //   expect(component.hasData).toBeTrue();
  // });

  describe('applyFilter', () => {
    let filtersAppliedSpy: jasmine.Spy;

    beforeEach(() => {
      filtersAppliedSpy = spyOn(component.filtersApplied, 'emit');
      // Set some values in the form controls for testing
      component.filterForm.get('Name')?.setValue('item');
      component.filterForm.get('Status')?.setValue('active');
      component.filterForm.get('ID')?.setValue('');
    });

    it('should update the filters input object with current form values', () => {
      component.applyFilter();

      expect(component.filters['Name']).toBe('item');
      expect(component.filters['Status']).toBe('active');
      expect(component.filters['ID']).toBe('');
    });

    it('should emit filtersApplied event without payload', () => {
      component.applyFilter();
      expect(filtersAppliedSpy).toHaveBeenCalledTimes(1);
      expect(filtersAppliedSpy).toHaveBeenCalledWith();
    });

    it('should handle empty form values correctly', () => {
      component.filterForm.get('Name')?.setValue('');
      component.filterForm.get('Status')?.setValue('');
      component.filterForm.get('ID')?.setValue('');

      component.applyFilter();

      expect(component.filters['Name']).toBe('');
      expect(component.filters['Status']).toBe('');
      expect(component.filters['ID']).toBe('');
      expect(filtersAppliedSpy).toHaveBeenCalled();
    });
  });
});
