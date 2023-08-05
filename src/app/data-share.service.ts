import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  paymentTab = false;
  adminTab = false;
  reportTab = false;

  user: User = new User();

  constructor(private router: Router) { }

  public set userInfo(user: any){
    this.user.username = user.username;
    this.user.password = user.password;
    this.user.userId = user.userId; 
  }

  
  getUser(): User{
    return this.user;
  }
   
}
