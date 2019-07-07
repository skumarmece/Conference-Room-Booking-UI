import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { HttpClientModule, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { CreateConferenceComponent } from './create-conference/create-conference.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppService } from './app.service';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatStepperModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable()
export class SpringbootInterceptor implements HttpInterceptor {
  constructor(public auth: AppService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Clone the request to add the new header
    const clonedRequest = request.clone({ 
      headers: request.headers.set('Set-Cookie', 'jsessionid=' + this.auth.getJSessionId()) 
    });

    // Pass control to the next request
    return next.handle(clonedRequest);
  }
}
@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    CreateConferenceComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [AppService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpringbootInterceptor,
      multi: true
    }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
