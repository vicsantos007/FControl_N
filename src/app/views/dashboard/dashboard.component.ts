import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private cookieService: CookieService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.obterToken();
  }

  protected obterToken() {
    const token = this.cookieService.get('aut');
    if (token == null || token.length == 0 || token == '') {
      this.router.navigate(['/login']);  
    }
  }
}
