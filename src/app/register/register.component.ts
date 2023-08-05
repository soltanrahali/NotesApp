import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataShareService } from '../data-share.service';
import { AuthenticationGaurd } from '../services/authentication-guard.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  
  constructor(
    private router: Router,
    private auth: AuthenticationGaurd,
    private data: DataShareService
    ) { }

  loginValid = true;
  public isAuthenticated = false;
 
  username = "";
  password = ""; 

  ngOnInit(): void {
  }

  onSubmit(){

    const user = {
      username: this.username,
      password: this.password
    } 
    console.log("User ", user)
    this.auth.loginUser(user).subscribe(  
      (res: any) => {   
        console.log(res)
        const response = res.response.body;
        const userInf = {
          username: response.name,
          password: this.password,
        };
        this.data.userInfo = userInf;
        this.auth.holdUser(this.data.getUser());
        this.router.navigateByUrl('/home');        
      },  
      (      error: any) => {  
        this.loginValid = false;  
        console.log(error)
      }  
   );   
  }
}
