import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Modal/User';
import { UserList } from '../Modal/UserList';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) { }

  getAllUsers(page: number): Observable<UserList> {
    return this.http.get<UserList>(`${this.baseUrl}?page=${page}`);
  }

  addUser(user: User): Observable<User> {
      return this.http.post<User>(this.baseUrl, user);
  }

  UpdateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${user.id}`, user);
}

}
