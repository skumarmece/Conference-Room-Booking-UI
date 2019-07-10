import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {


  addForm: FormGroup;
  roles: any;
  submitted = false;

  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder,
    private router: Router,private http: HttpClient) { }

  ngOnInit() {

    this.http.get('/api/v1/roles').subscribe(data => {
      console.log(data);
      this.roles = data;
    });
    this.initializeForm();

  }

  initializeForm() {
    this.addForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['']

    });
  }

  newEmployee(): void {
    this.submitted = false;

  }

  changeRole(event) {
    console.log(event);
  }

  addEmployee() {
    if (this.addForm.valid) {
      let data = this.addForm.value;
      console.log(data);
      data.roles =   data.roles[0];
      this.employeeService.createEmployee(data).subscribe(() => {
        this.gotoList();
      });
    }
  }
  gotoList() {
    this.router.navigate(['/employees']);
  }
}