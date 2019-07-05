import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, finalize } from 'rxjs/operators';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Conference-Room-Booking';

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
    this.app.authenticate(undefined, undefined);
  }

  isAuthenticated(){
    return this.app.authenticated;
  }

  logout() {
    this.http.post('logout', {})
    .pipe(
      finalize(() => {
        this.app.authenticated = false;
          this.router.navigateByUrl('/login');
      })
    )   
    .subscribe();
  }
}
