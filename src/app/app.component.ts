import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-root',
  template : 
  `<nav class='navbar navbar-expand navbar-light bg-light'>
  <a class='navbar-brand'>{{pageTitle}}</a>
  <ul class='nav nav-pills'>
    <li><a class='nav-link' routerLinkActive='active' [routerLink]="['/course/list']">Course</a></li>
    <li><a class='nav-link' routerLinkActive='active' [routerLink]="['/subject/add']">Subject</a></li>
  </ul>
</nav>
<div class = 'container'>
  <router-outlet></router-outlet>
</div>
  `
})
export class AppComponent {
  title = 'CourseSubject';
}
