import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {

  title = 'My Bookings';
  myBookings:any;

  constructor(private app: AppService, private http: HttpClient,private router: Router) {

    if(!app.authenticated){
      router.navigate(['/log-in']);
    }
    http.get('/v1/conference').subscribe(data => {
      console.log(data);
      this.myBookings = data;
    });
  }

  authenticated() { return this.app.authenticated; }

}