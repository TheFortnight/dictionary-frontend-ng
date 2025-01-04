import {
  HttpClient
} from '@angular/common/http';
import {
  inject,
  Injectable
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  http = inject(HttpClient);
  baseApiUrl = 'https://res8.some-programator.ru/api/registration'//'http://127.0.0.1:8051/api/registration';

  register(payload: {name: string, email:string, password: string}){

    return this.http.post(`${this.baseApiUrl}`, payload)

  }

}

