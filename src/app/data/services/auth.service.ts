import {
  HttpClient
} from '@angular/common/http';
import {
  inject,
  Injectable
} from '@angular/core';
import {
  AuthLogin
} from '../interfaces/authlogin.interface';
import {
  AuthReg
} from '../interfaces/authreg.interface';
import {
  AuthMe
} from '../interfaces/authme.interface';
import {
  tap
} from 'rxjs';
import {
  CookieService
} from 'ngx-cookie-service';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  http = inject(HttpClient);
  baseApiUrl = 'https://res8.some-programator.ru/api/' //'http://127.0.0.1:8051/api/registration';
  cookieService = inject(CookieService);
  token: string | null = this.cookieService.get('token');
  

  register(payload: {
    name: string,
    email: string,
    password: string
  }) {

    return this.http.post < AuthReg > (`${this.baseApiUrl}registration`, payload)
      .pipe(
        tap((resp) => {
          this.token = resp.token;
          this.cookieService.set('token', this.token);
        })
      )

  }

  me() {
    this.token = this.cookieService.get('token');
    return this.http.get < AuthMe > (`${this.baseApiUrl}me`)
    .pipe(
      tap({
        next: (resp)=> {
          
          console.log('me: ', resp);
          
      
        },
        error: (error) => {
          if(error.status = 401) {
          console.log('Not Authorized: ', error);
          this.cookieService.deleteAll();
          }
         else {
          console.log('Me error: ', error)
        }
      }
      })
    )

  }

  signIn(payload: {
    email: string,
    password: string
  }) {

    return this.http.post < AuthLogin > (`${this.baseApiUrl}login`, payload)
      .pipe(

        tap(resp => {
          this.token = resp.access_token;
          console.log('Login token: ', this.token);
          this.cookieService.set('token', this.token);
        })

      )

  }

  logOut() {
    return this.http.get(`${this.baseApiUrl}logout`)
    .pipe(
      tap(() => {
        this.token = null;
        this.cookieService.deleteAll();
      })
    )
  }

  get isAuth() {
    if (!this.token) this.token = this.cookieService.get('token');
    return (!!this.token);
  }

}
