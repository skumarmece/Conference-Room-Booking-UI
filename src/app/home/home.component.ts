import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {

  title = 'My Bookings';
  myBookings: any;

  constructor(private app: AppService, private http: HttpClient, private router: Router) {

    if (!app.authenticated) {
      router.navigate(['/log-in']);
    }
    this.loadConferenceDate();
  }

  loadConferenceDate(){
    this.http.get('/api/v1/conference').subscribe(data => {
      console.log(data);
      this.myBookings = data;
    });
  }

  deleteConference(id: Number) {
    this.http.delete('/api/v1/conference/'+id).subscribe(data => {
      this.loadConferenceDate();
    });
  }

  conferenceDetails(id: Number){
    this.router.navigate(['/conference', id]);
  }
  authenticated() { return this.app.authenticated; }

}