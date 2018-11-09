import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../shared/interfaces/user.interface';
import {URL} from '../shared/enums/url.enum';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private hc: HttpClient) { }

  /** POST: add a new user. */
  signup(user: User): Observable<User> {
    return this.hc.post<User>(URL.USER, user);
  }

  /** POST: signin as user. */
  signin(user: User): Observable<any> {
    const {email, password} = user;
    return this.hc.post<any>(URL.USERSIGNIN, {email}, {
      headers: new HttpHeaders().set('password', `${password}`)
    });
  }
}
