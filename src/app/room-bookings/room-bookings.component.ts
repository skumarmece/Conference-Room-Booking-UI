import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-room-bookings',
  templateUrl: './room-bookings.component.html',
  styleUrls: ['./room-bookings.component.css']
})
export class RoomBookingsComponent implements OnInit {

  id: number;
  conferences: Object;

  constructor(private app: AppService, private http: HttpClient, private fb: FormBuilder,
    private router: Router,private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.http.get('/api/v1/conference/room/' + this.id).subscribe(data => {
      console.log(data);
      this.conferences = data;
    });

  }

}
