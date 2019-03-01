import { Component, OnInit } from '@angular/core';
// manually defined imports
import { AuthServiceService } from './../auth/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navUpdate: boolean;

  constructor(private _authService: AuthServiceService) { }

  ngOnInit() {
    this._authService.$auth.subscribe((data: any) => {
      this.navUpdate = data;
    });

  }
  logout() {
    this._authService.logout();
  }


}
