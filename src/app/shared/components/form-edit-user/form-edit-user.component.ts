import { Component } from '@angular/core';
import { User } from '../../interface/user';
import { UserService } from '../../services/userService/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-edit-user.component.html',
  styleUrl: './form-edit-user.component.css'
})

export class FormEditUserComponent {
  user: User | null = null;
  isLoading: boolean = true;

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  bio: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      if (user && user.username) {
        const [name, ...lastNameParts] = user.username.split(' ');
        this.firstName = name;
        this.lastName = lastNameParts.join(' ');
      }
      this.isLoading = false;
    });

    if (!this.user) {
      this.userService.loadUserFromToken();
    }
  }

  saveChanges(formValues: any): void {
    if (!formValues.firstName || !formValues.lastName || !formValues.email || !formValues.password || !formValues.bio) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'All fields are required!',
      });
      return;
    }

    if (!this.user) {
      return;
    }

    const updatedData = {
      username: `${formValues.firstName} ${formValues.lastName}`,
      email: formValues.email,
      password: formValues.password,
      profile_picture: formValues.profile_picture,
      bio: formValues.bio,
    };

    this.userService.updateUser(this.user.user_id, updatedData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User updated successfully!',
        }).then(() => {
          location.reload();
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update user. Please try again.',
        });
        console.error('Error updating user:', error);
      }
    );
  }

  cancelChanges(): void {
    this.userService.loadUserFromToken();
  }
}

