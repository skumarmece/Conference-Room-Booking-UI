import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class AppService {


  updateUser(username: string) {
    this.http.get('/api/v1/users?name=' + username).subscribe(data => {
        console.log(data);
        this.userInfo = data[0];
      });
  }

    JSESSION_ID: string;
    getJSessionId() {
        return this.JSESSION_ID;
    }


    userName: string ;
    userInfo: any;
    authenticated = false;

    getCurrentUserInfo(){
        return this.userInfo;
    }
    constructor(private http: HttpClient) {
    }

    authenticate(credentials, callback) {

        this.userName = credentials.userName;
        
        const body = new HttpParams()
            .set('username', credentials.username)
            .set('password', credentials.password);


        this.http.post('login',
            body.toString(),
            {
                withCredentials: true,
                headers: new HttpHeaders()
                    .set('Content-Type', 'application/x-www-form-urlencoded')
                    .set('Access-Control-Allow-Origin', 'http://localhost:4200')
                //  .set('Referer','http://localhost:4200/home')
            }
        ).subscribe(
            response => {
                console.log(response);
            }
        );

        this.authenticated = true;
        return callback && callback();

        /*
                this.http.post('login', credentials ? {username: credentials.username,password: credentials.password}:{}).subscribe(response => {
                    console.log(response);
                    this.JSESSION_ID = "XXXXXXXXXXXXXX";
                    if (response['name']) {
                        this.authenticated = true;
                    } else {
                        this.authenticated = false;
                    }
                    return callback && callback();
                });
        */
    }

}