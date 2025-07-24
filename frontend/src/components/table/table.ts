import {Component, Input, SimpleChanges} from '@angular/core';

export type TableHeader = {
  label: string;
}

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table {
  @Input() headers: TableHeader[] = [];

  @Input() data: string[][] = [];

  hasData: boolean = false;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.hasData = this.data && this.data.length > 0;
    }
  }
}
