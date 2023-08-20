import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() rating?: number | 0;

  totalRating = 10;
  finalRating = 0;
  ratingArr: Array<RatingObj> = new Array<RatingObj>();

  ngOnInit(): void {
    if (this.rating) { this.finalRating = Math.floor(this.rating / 2); }
    this.createRatingArray();
  }

  createRatingArray() {
    let index = 1;
    while(index <= (this.totalRating / 2)) {
      const tempObj = new RatingObj();
      tempObj.value = index;
      tempObj.checked = index <= this.finalRating ? true : false;
      this.ratingArr.push(tempObj);
      index++;
    }
  }

}


export class RatingObj {
  value?: number;
  checked?: boolean;
}
