import { Component, OnInit } from '@angular/core';
import {Conference} from "../conference"
import { Subject } from 'rxjs';
@Component({
  selector: 'app-create-conference',
  templateUrl: './create-conference.component.html',
  styleUrls: ['./create-conference.component.css']
})
export class CreateConferenceComponent implements OnInit {

  conference: Conference;
  rooms:any;
  constructor() { 
    this.conference = new  Conference();
    var rooml = [{
      roomName: "Sample1",
      type:"small"
  }];
  this.rooms = new Subject<any>();
  setTimeout(function(){
    this.rooms.next(rooml);
  }.bind(this),1000);
  
  }

  ngOnInit() {
  }

}
