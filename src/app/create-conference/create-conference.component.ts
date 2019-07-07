import { Component, OnInit } from '@angular/core';
import { Conference } from "../conference"
import { Subject } from 'rxjs';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-create-conference',
  templateUrl: './create-conference.component.html',
  styleUrls: ['./create-conference.component.css']
})
export class CreateConferenceComponent implements OnInit {

  createConferenceForm: FormGroup;
  conference: Conference;
  rooms: any;
  dateFrom: Date;
  dateTo: Date;
  purpose: String;
  description: String;
  selectedRoom: Number;

  constructor(private app: AppService, private http: HttpClient, private fb: FormBuilder,
    private router: Router) {

    this.dateFrom = new Date();
    var dt = new Date();
    dt.setMinutes(dt.getMinutes() + 30);
    this.dateTo = dt;

    this.conference = new Conference();
    if (!app.authenticated) {
      router.navigate(['/log-in']);
    }
    http.get('/v1/rooms').subscribe(data => {
      console.log(data);
      this.rooms = data;
    });
  }


  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.createConferenceForm = this.fb.group({
      dateTo: ['', Validators.required],
      dateFrom: ['', Validators.required]
    }, { validator: this.dateLessThan('dateFrom', 'dateTo') });
  }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: "Date from should be less than Date to"
        };
      }
      return {};
    }
  }

  onSubmit() {
    let obj = {
      "user": {
        "firstName": this.app.getCurrentUser(),
      },
      "description": this.description,
      "name": this.purpose,
      "startTime": this.dateFrom,
      "endTime": this.dateTo,
      "room": {
        "id": this.selectedRoom,
      }
    };
    console.log(this.app.getCurrentUser());
    console.log(obj);

    this.http.post('/v1/conference', obj).subscribe(data => {
      console.log(data);
      this.rooms = data;
    });

  }

  onRoomSelect(item: any) {
    this.selectedRoom = item;
  }
}
