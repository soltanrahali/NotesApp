import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataShareService } from 'src/app/data-share.service';
import { AuthenticationGaurd } from 'src/app/services/authentication-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
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
        const response = res;
        const userInf = {
          username: response.username,
          password: this.password,
          userId: response.userId,
        };
        this.data.userInfo = userInf;
        console.log("********")
        console.log(userInf)
        console.log(this.data)
        console.log(this.data.getUser())
        console.log("********")
        this.auth.holdUser(this.data.getUser());
        this.router.navigateByUrl('/home');        
      },  
      error => {  
        this.loginValid = false;  
        console.log(error)
      }  
   );   
  }

}
