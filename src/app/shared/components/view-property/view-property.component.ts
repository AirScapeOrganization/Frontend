import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-property',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css'],
})
export class ViewPropertyComponent implements OnInit {
  listingId!: string;
  startDate: string = '2024-12-15';
  endDate: string = '2024-12-20';

  // URLs de las imágenes
  imageUrls: string[] = [
    'https://news.airbnb.com/wp-content/uploads/sites/4/2019/06/PJM020719Q202_Luxe_WanakaNZ_LivingRoom_0264-LightOn_R1.jpg?fit=2500%2C1666',
    'https://news.airbnb.com/wp-content/uploads/sites/4/2020/05/Airbnb-Beachfront-Greece.jpg?fit=2662,1776', 
    'https://media.admagazine.com/photos/62b48dd2e490b8c021c2932b/16:9/w_2560%2Cc_limit/The+Boot+-+New+Zealand.jpg',
    'https://a0.muscache.com/im/pictures/5e67688b-757d-44d6-8b4b-1e91dc6fe49f.jpg?im_w=1920'
  ];

  currentImageIndex: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.listingId = params.get('id')!;
      console.log(`Listing ID: ${this.listingId}`);
    });
  }

  // Función para ir a la imagen anterior
  previousImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.imageUrls.length - 1; // Va al final si está en la primera
    }
  }

  // Función para ir a la siguiente imagen
  nextImage(): void {
    if (this.currentImageIndex < this.imageUrls.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0; // Va al inicio si está en la última
    }
  }
}
