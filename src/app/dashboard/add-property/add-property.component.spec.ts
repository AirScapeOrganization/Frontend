import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

import { AddPropertyComponent } from './add-property.component';

describe('AddPropertyComponent', () => {
  let component: AddPropertyComponent;
  let fixture: ComponentFixture<AddPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
      ],
      declarations: [AddPropertyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.propertyForm.value).toEqual({
      propertyName: '',
      address: '',
      latitude: '',
      longitude: '',
      price: '',
      rooms: '',
      max_guests: '',
      bathrooms: '',
      description: '',
      startDate: '',
      endDate: '',
    });
  });

  it('should mark form as invalid if required fields are empty', () => {
    component.propertyForm.patchValue({
      propertyName: '',
      address: '',
      latitude: '',
      longitude: '',
      price: '',
      rooms: '',
      max_guests: '',
      bathrooms: '',
      description: '',
      startDate: '',
      endDate: '',
    });
    expect(component.propertyForm.valid).toBeFalse();
  });

  it('should add images to the images array when onImageUpload is called', () => {
    const mockEvent = {
      target: {
        files: [
          new File(['image1'], 'image1.png', { type: 'image/png' }),
          new File(['image2'], 'image2.jpg', { type: 'image/jpeg' }),
        ],
      },
    } as unknown as Event;

    component.onImageUpload(mockEvent);

    // Verificar que las imágenes se hayan añadido correctamente
    expect(component.images.length).toBe(2);
  });

  it('should reset the form and navigate on cancel', () => {
    const navigateSpy = spyOn((component as any).router, 'navigate');
    component.onCancel();
    expect(component.propertyForm.pristine).toBeTrue();
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should log form data and images on submit', () => {
    const consoleSpy = spyOn(console, 'log');
    component.propertyForm.setValue({
      propertyName: 'Test Property',
      address: '123 Test Street',
      latitude: '100',
      longitude: '100',
      price: '100',
      rooms: '3',
      max_guests: '3',
      bathrooms: '2',
      description: 'A beautiful test property.',
      startDate: '2024-01-01',
      endDate: '2024-01-15',
    });
    component.images = ['image1.png', 'image2.jpg'];

    component.onSubmit();

    expect(consoleSpy).toHaveBeenCalledWith('Form Data:', component.propertyForm.value);
    expect(consoleSpy).toHaveBeenCalledWith('Uploaded Images:', component.images);
  });
});
