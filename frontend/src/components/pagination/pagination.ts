import {Component, EventEmitter, Output, signal} from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css'
})
export class Pagination {
  @Output() pageChange = new EventEmitter<number>();

  protected currentPage = signal<number>(1)
  protected totalPages = signal<number>(1)
  protected pages = signal<number[]>([])

  upgradePages(totalPages: number) {
    this.totalPages.set(totalPages);
    this.genPages();
  }

  private genPages() {
    const pages = Array.from({
        length: this.totalPages() - 1  },
      (_, i) => i + 1
    )

    this.pages.set(pages)
  }

  protected changePage(page: number) {
    this.currentPage.set(page)
    this.pageChange.emit(page);
  }

  reset() {
    this.currentPage.set(1)
    this.totalPages.set(1)
    this.pages.set([])
  }

  getCurrentPage() {
    return this.currentPage();
  }
}
