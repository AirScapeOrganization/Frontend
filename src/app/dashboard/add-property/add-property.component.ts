import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [
    NavbarComponent, FooterComponent, CommonModule, ReactiveFormsModule, FormsModule
  ],
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent {
  propertyForm: FormGroup;
  images: string[] = [];
  startDate: string = '';  
  endDate: string = '';   
  currentDate: string = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder, private router: Router) {
    this.propertyForm = this.fb.group({
      propertyName: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      rooms: ['', [Validators.required, Validators.min(1)]],
      bathrooms: ['', [Validators.required, Validators.min(1)]],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('Form Data:', this.propertyForm.value);
    console.log('Uploaded Images:', this.images);
  }

  onCancel() {
    this.propertyForm.reset();
    this.router.navigate(['/dashboard']);
  }

  onImageUpload(event: any) {
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
