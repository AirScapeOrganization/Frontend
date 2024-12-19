import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListingService } from '../../shared/services/listingService/listing.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [
    NavbarComponent, FooterComponent, CommonModule, ReactiveFormsModule, FormsModule
  ],
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  propertyForm: FormGroup;
  images: File[] = [];
  imagePreviews: string[] = [];
  
  property: any = {}; 

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
    });
  }

  ngOnInit(): void {
    // Suscribirse a los cambios del formulario
    this.propertyForm.valueChanges.subscribe((values) => {
      this.property ={values};
      console.log(this.property);
    });
  }

  logForm(fieldName: string) {
    console.log(`${fieldName}: `, this.property[fieldName]); 
  }

  logImages() {
    this.images.forEach((image, index) => {
      console.log(`Imagen ${index + 1}: ${image.name}`);
    });
  }

  onSubmit() {
    console.log("Form Submitted!");
    this.logForm('title');
    this.logForm('address');
    this.logForm('latitude');
    this.logForm('longitude');
    this.logForm('price_per_night');
    this.logForm('num_bedrooms');
    this.logForm('num_bathrooms');
    this.logForm('max_guests');
    this.logForm('description');
    
    this.logImages();

    if (this.propertyForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill out all required fields.',
      });
      return;
    }

  
    const listingData = this.property;
  
    this.listingService.addListing(listingData, this.images).subscribe(
      () => {
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
        } else if (error.status === 403) {
          errorMessage = 'You are not authorized to perform this action.';
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

  onImageUpload(event: any) {
  const files = event.target.files;
  if (files) {
    for (const file of files) {
      this.listingService.addPhotos(file).subscribe(
        (uploadedUrl) => {
          this.imagePreviews.push(uploadedUrl); // Add the Supabase URL to the preview list
          console.log(`Image uploaded: ${file.name}, URL: ${uploadedUrl}`);
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
  }
}

  removeImage(index: number) {
    this.images.splice(index, 1);  
    this.imagePreviews.splice(index, 1);  
    console.log('Image removed!');
  }

  onCancel() {
    console.log("Cancel clicked!");
  }
}
