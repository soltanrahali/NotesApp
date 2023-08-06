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
  cpassword = ""; 
  successMessage = "";
  
  passwordCheckfail = false;
  
  ngOnInit(): void {
  }

  onSubmit(){
    if(this.password != this.cpassword){
      this.passwordCheckfail = true;  
    }else{
      const user = {
        username: this.username,
        password: this.password
      } 
      console.log("User ", user)
      this.auth.registerUser(user).subscribe(  
        (res: any) => {   
          console.log(res)
          this.passwordCheckfail = false;  
          this.successMessage = "Registerd successfully";
          this.router.navigateByUrl('/');        
        },  
        (error: any) => {  
          this.loginValid = false;  
          console.log(error)
        }  
     );   
    }
  }
}
