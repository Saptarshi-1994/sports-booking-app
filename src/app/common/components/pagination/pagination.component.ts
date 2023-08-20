import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() totalCount!: number;
  @Input() eachBlock!: number;

  @Output() pageChanged: EventEmitter<any> = new EventEmitter<any>();

  numberOfPages: number = 0;
  pagesArr: Array<number> = new Array<number>();
  disablePrev: boolean = false;
  disableNext: boolean = false;
  selectedPage: number = 1;

  ngOnInit(): void {
    this.numberOfPages = Math.ceil(this.totalCount / this.eachBlock);
    if (this.numberOfPages > 0) {
      let index = 1;
      while (index <= this.numberOfPages) {
        this.pagesArr.push(index);
        index++;
      }
      this.enableOrDisablePrevLink();
      this.enableOrDisableNextLink();
    }
  }

  selectPrevPage() {
    this.selectedPage--;
    this.enableOrDisablePrevLink();
    this.enableOrDisableNextLink();
    this.emitPageNumberDetails();
  }

  selectNextPage() {
    this.selectedPage++;
    this.enableOrDisablePrevLink();
    this.enableOrDisableNextLink();
    this.emitPageNumberDetails();
  }

  selectPage(pageNum: number) {
    this.selectedPage = pageNum;
    this.enableOrDisablePrevLink();
    this.enableOrDisableNextLink();
    this.emitPageNumberDetails();
  }

  enableOrDisablePrevLink() {
    this.disablePrev = this.selectedPage === 1 ? true : false
  }

  enableOrDisableNextLink() {
    this.disableNext = this.selectedPage === this.numberOfPages ? true : false;
  }

  emitPageNumberDetails() {
    const tempObj = {
      startIndex: 0,
      endIndex: 0
    }
    tempObj.startIndex = (this.selectedPage - 1) * this.eachBlock;
    tempObj.endIndex = this.selectedPage * this.eachBlock - 1;
    this.pageChanged.emit(tempObj);
  }

}
