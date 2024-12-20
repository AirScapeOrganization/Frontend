import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ListingService } from '../../../shared/services/listingService/listing.service';

@Component({
  selector: 'app-form-property',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-property.component.html',
  styleUrl: './form-property.component.css'
})
export class FormPropertyComponent {
  propertyForm: FormGroup;
  imagePreviews: string[] = [];
  uploadedUrls: string[] = [];

  constructor(
    private fb: FormBuilder,
    private listingService: ListingService,
    private router: Router
  ) {
    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      address: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      price_per_night: ['', Validators.required],
      num_bedrooms: ['', Validators.required],
      num_bathrooms: ['', Validators.required],
      max_guests: ['', Validators.required],
      description: ['', Validators.required],
      photos: [null],
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.propertyForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill out all required fields.',
      });
      return;
    }

    const listingData = new FormData();
    console.log('Formulario antes de agregar a FormData:', this.propertyForm.value);

    // Agregar los campos del formulario al FormData
    Object.keys(this.propertyForm.value).forEach((key) => {
      listingData.append(key, this.propertyForm.value[key]);
    });

    // Agregar las fotos al FormData
    this.uploadedUrls.forEach((url) => {
      listingData.append('photos[]', url); // Si el backend espera un array de fotos
    });


    this.listingService.addListing(listingData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Property Added',
          text: 'The property has been added successfully.',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/explore']);
      },
      (error) => {
        let errorMessage = 'Failed to add property. Please try again.';
        if (error.status === 422) {
          errorMessage = 'Validation failed. Please check your inputs.';
        } else if (error.status === 500) {
          errorMessage = 'Server error. Please contact support.';
        }

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
        console.error('Error adding property:', error);
      }
    );
  }

  onImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0]; // Solo subimos el primer archivo seleccionado
    const reader = new FileReader();

    // Mostrar una vista previa local
    reader.onload = () => {
      if (reader.result) {
        this.imagePreviews.push(reader.result as string);
      }
    };
    reader.readAsDataURL(file);

    // Subir la imagen al servidor
    this.listingService.addPhotos(file).subscribe(
      (uploadedUrl) => {
        this.uploadedUrls.push(uploadedUrl);
        console.log(`Image uploaded successfully: ${uploadedUrl}`);
      },
      (error) => {
        console.error('Error uploading image:', error);
        Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: 'Failed to upload image. Please try again.',
        });
      }
    );
  }

  removeImage(index: number) {
    this.imagePreviews.splice(index, 1);
    this.uploadedUrls.splice(index, 1);
  }
}
