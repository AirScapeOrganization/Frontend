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
      propertyName: [''],
      address: ['', Validators.required,Validators.minLength(10), Validators.maxLength(20)],
      latitude: ['', Validators.required, Validators.min(1), Validators.max(1000)],
      longitude: ['', Validators.required, Validators.min(1), Validators.max(1000)],
      price: ['', [Validators.required, Validators.min(50), Validators.max(1000000)]],
      rooms: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      max_guests: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      bathrooms: ['', [Validators.required, Validators.min(1), Validators.max(10) ]],
      description: ['', [Validators.minLength(10), Validators.maxLength(500)]],
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
