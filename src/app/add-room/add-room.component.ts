import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  categories: any;
  selectedCategory: any;
  name:String;
  constructor(private app: AppService, private http: HttpClient,
    private fb: FormBuilder, private router: Router) {

    if (!app.authenticated) {
      router.navigate(['/log-in']);
    }

    http.get('/api/v1/categories').subscribe(data => {
      console.log(data);
      this.categories = data;
    });
  }

  onSubmit() {
    let obj = {
      "name": this.name,
      "category": this.selectedCategory
    };
    
    console.log(obj);

    this.http.post('/api/v1/rooms', obj).subscribe(data => {
      console.log(data);
      this.router.navigate(['/rooms']);
    });
  }

  ngOnInit() {
  }

  onCategorySelect(item: any) {
    this.selectedCategory = item;
  }

}
