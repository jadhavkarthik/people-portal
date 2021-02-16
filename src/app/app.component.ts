import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sma';
  @ViewChild('sidenav') sidenav: MatSidenav;
  constructor(
    private router: Router
  ) {
    this.router.events.subscribe(() => {
      this.sidenav.close();
    });
  }

  close() {
    this.sidenav.close();
  }
}
