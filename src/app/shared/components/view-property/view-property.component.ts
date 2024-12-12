import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-property',
  standalone: true,
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css'],
})
export class ViewPropertyComponent implements OnInit {
  listingId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.listingId = params.get('id')!;
      console.log(this.listingId);  
    });
  }
}
