import { Component, OnInit } from '@angular/core';
import {Conference} from "../conference"
@Component({
  selector: 'app-create-conference',
  templateUrl: './create-conference.component.html',
  styleUrls: ['./create-conference.component.css']
})
export class CreateConferenceComponent implements OnInit {

  conference: Conference;
  constructor() { 
    this.conference = new  Conference();
  }

  ngOnInit() {
  }

}
