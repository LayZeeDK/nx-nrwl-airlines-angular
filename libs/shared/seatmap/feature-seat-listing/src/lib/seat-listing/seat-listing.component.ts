import { Component } from '@angular/core';

@Component({
  selector: 'seatmap-seat-listing',
  styleUrls: ['./seat-listing.component.css'],
  templateUrl: './seat-listing.component.html',
})
export class SeatListingComponent {
  onSeatConfirmed(isConfirmed: boolean): void {
    console.log('Is seat confirmed?', isConfirmed);
  }
}
