import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

export type TableHeader = {
  label: string;
  filter?: {
    type: 'text' | 'options',
    options?: { label: string, value: string }[];
  }
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table {
  filterForm!: FormGroup;

  @Input() headers: TableHeader[] = [];
  @Input() data: string[][] = [];
  @Input() filters: Record<string, any> = {};

  @Output() filtersApplied = new EventEmitter<Record<string, any>>();

  hasData: boolean = false;

  ngOnInit(): void {
    this.initializeFilterForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.hasData = this.data && this.data.length > 0;
    }
  }

  private initializeFilterForm(): void {
    const controls: { [key: string]: FormControl } = {};
    this.headers.forEach(header => {
      controls[header.label] = new FormControl('');
    });

    this.filterForm = new FormGroup(controls);
  }

  applyFilter(): void {
    const currentFilters = this.filterForm.value;

    for (const key in currentFilters) {
      this.filters[key] = currentFilters[key];
    }

    this.filtersApplied.emit();
  }
}
