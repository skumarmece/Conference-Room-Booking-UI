import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {

  title = 'My Bookings';
  greeting = {};

  constructor(private app: AppService, private http: HttpClient) {
    http.get('/v1/rooms').subscribe(data => {
      console.log(data);
      this.greeting["content"] = JSON.stringify(data);
    });
  }

  authenticated() { return this.app.authenticated; }

}