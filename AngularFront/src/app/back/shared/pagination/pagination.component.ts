import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() totalPages: number = 0;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  pageNumbers: number[] = [];

  ngOnChanges(): void {
    this.pageNumbers = Array.from({length: this.totalPages}, (_, index) => index);
  }

  navigateToPage(pageNumber: number): void {
    this.pageChanged.emit(pageNumber);
  }
}
