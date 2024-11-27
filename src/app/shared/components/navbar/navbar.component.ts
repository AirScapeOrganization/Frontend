import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown, faAngleUp, faCircleInfo, faCircleQuestion, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isDropdownOpen = false;
  currentRoute: string = '';
  buttons: { label: string; link: string; visibleOnRoutes: string[] }[] = [
    { label: 'Home', link: '/', visibleOnRoutes: ['/explore', '/owners', '/contact', '/help', '/blog']},
    { label: 'Explore', link: '/explore', visibleOnRoutes: ['/', '/owners', '/contact', '/blog', '/help']},
    { label: 'Owners', link: '/owners', visibleOnRoutes: ['/', '/explore', '/contact', '/help', '/blog']},
    { label: 'Contact', link: '/contact', visibleOnRoutes: ['/owners', '/explore', '/blog', '/help']},
    { label: 'Blog', link: '/blog', visibleOnRoutes: ['/explore', '/owners', '/contact', '/help']},
    { label: 'Help', link: '/help', visibleOnRoutes: ['/explore', '/owners', '/contact', '/blog']},

  ];

  filteredButtons: { label: string; link: string }[] = [];

  faAngleDown = faAngleDown;
  faCircleInfo = faCircleInfo;
  faEnvelope = faEnvelope;
  faCircleQuestion = faCircleQuestion;
  faAngleUp = faAngleUp;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        this.updateFilteredButtons();
      }
    });

    this.currentRoute = this.router.url;
    this.updateFilteredButtons();
  }

  updateFilteredButtons() {
    this.filteredButtons = this.buttons.filter((button) =>
      button.visibleOnRoutes.includes(this.currentRoute)
    );
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
