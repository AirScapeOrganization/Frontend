import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faCompass, faEnvelope, faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentRoute: string = '';
  buttons: { label: string; link: string; icon: any; visibleOnRoutes: string[] }[] = [
    { label: 'Home', link: '/', icon: faCircleInfo, visibleOnRoutes: ['/explore', '/contact', '/help', '/blog'] },
    { label: 'Explore', link: '/explore', icon: faCompass, visibleOnRoutes: ['/', '/contact', '/blog', '/help'] },
    { label: 'Contact', link: '/contact', icon: faEnvelope, visibleOnRoutes: ['/', '/explore', '/blog', '/help'] },
    { label: 'Blog', link: '/blog', icon: faCircleInfo, visibleOnRoutes: ['/', '/explore', '/contact', '/help'] },
    { label: 'Help', link: '/help', icon: faCircleQuestion, visibleOnRoutes: ['/', '/explore', '/contact', '/blog'] },
  ];

  filteredButtons: { label: string; link: string; icon: any }[] = [];

  faCompass = faCompass;
  faCircleInfo = faCircleInfo;
  faCircleQuestion = faCircleQuestion;
  faEnvelope = faEnvelope;

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
}
