import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  constructor(private app: AppService, private http: HttpClient, private fb: FormBuilder,
    private router: Router) {

    if (!app.authenticated) {
      router.navigate(['/log-in']);
    }
    http.get('/api/v1/rooms').subscribe(data => {
      console.log(data);
      this.rooms = data;
    });
  }

  rooms: any;
  ngOnInit() {
  }
  deleteRoom(id: number){
    this.http.delete('/api/v1/rooms/'+id).subscribe(data => {
      console.log(data);
    });
  }

  roomBookings(id: number){
    this.router.navigate(['/roomBookings', id]);
  }
}
