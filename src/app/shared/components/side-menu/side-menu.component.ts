import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../../interface/user';
import { UserService } from '../../services/userService/user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})

export class SideMenuComponent {
  faAngleRight = faAngleRight;
  user: User | null = null;
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // Verifica si el observable 'user$' realmente emite el valor esperado.
    this.userService.user$.subscribe((user) => {
      console.log('User from service:', user);  // Añade esta línea para ver qué valor se emite.
      this.user = user;
      this.isLoading = false;
    });
  
    // Asegúrate de que el servicio se ejecute para cargar el usuario.
    if (!this.user) {
      this.userService.loadUserFromToken();
    }
  }
  

  logout(): void {
    localStorage.removeItem('authToken');
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }

  // Función para manejar la selección de archivo
  // En el componente SideMenuComponent, añade un console.log dentro del subscribe para ver la respuesta:

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file); // Verifica si el archivo fue seleccionado
      this.userService.uploadProfilePicture(file).subscribe(
        (response: any) => {
          console.log('Response:', response); // Verifica la respuesta de la API
          if (this.user) {
            this.user = { ...this.user, profile_picture: response.uploaded_url };
          }
        },
        (error) => {
          console.error('Error uploading profile picture:', error); // Esto te ayudará a ver el error exacto
        }
      );
    } else {
      console.log('No file selected'); // Verifica si no se seleccionó ningún archivo
    }
  }

}
