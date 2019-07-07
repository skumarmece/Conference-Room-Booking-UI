import { Component, OnInit } from '@angular/core';
import { Conference } from "../conference"
import { Subject } from 'rxjs';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
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
  errors:boolean;
  timeErrors: boolean;
  id: number;

  constructor(private app: AppService, private http: HttpClient, private fb: FormBuilder,
    private router: Router,private route: ActivatedRoute) {

    this.dateFrom = new Date();
    var dt = new Date();
    dt.setMinutes(dt.getMinutes() + 30);
    this.dateTo = dt;

    this.conference = new Conference();
    if (!app.authenticated) {
      router.navigate(['/log-in']);
    }
    http.get('/api/v1/rooms').subscribe(data => {
      console.log(data);
      this.rooms = data;
    });
  }


  ngOnInit() {

    this.createForm();
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.http.get('/api/v1/conference/'+this.id)
      .subscribe(data => {
        this.purpose = data["name"];
        this.description  = data["description"];
        this.dateFrom = new Date(data["startTime"]);
        this.dateTo = new Date(data["endTime"]);
        this.selectedRoom = data["room"];
      });
    }
    

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
    this.timeErrors = false;
    let obj = {
      "user": this.app.getCurrentUserInfo(),
      "description": this.description,
      "name": this.purpose,
      "startTime": this.dateFrom,
      "endTime": this.dateTo,
      "room": this.selectedRoom
    };
    
    if(this.dateFrom.getUTCMilliseconds() > this.dateFrom.getUTCMilliseconds()){
      this.timeErrors = true;
    }
    console.log(obj);
    if(!this.id){
      this.http.post('/api/v1/conference', obj).subscribe(
        data => {
        console.log(data);
        this.router.navigate(['/home']);
      },
      err  => {
        console.log(err);
       this.setError(err);
      } );
        
    }else{

      obj["id"] = this.id;
      this.http.put('/api/v1/conference/'+this.id, obj).subscribe(
        data => {
        console.log(data);
        this.router.navigate(['/home']);
      },
      err  => {
        console.log(err);
       this.setError(err);
      } );
    }

  }
  setError(err:any){
    if(err.status == 409){
      this.errors = true;
      setTimeout(function(){
        this.errors = false;
      }.bind(this),5000);
    }
  }

  onRoomSelect(item: any) {
    this.selectedRoom = item;
  }
}
