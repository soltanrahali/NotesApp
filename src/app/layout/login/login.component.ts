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
    this.auth.loginUser().subscribe((data)=>{
      console.log("data is lis")
      console.log(data)
      for(let i=0; i < data.length; i++){
        if(user.username == data[i].username && user.password == data[i].password){
          console.log(data[i].username)
          console.log(data[i].password)
          console.log(user.username)
          console.log(user.password)
          console.log("UIUIUIUIUI")
          this.isAuthenticated = true;
          // this.router.navigate(['home']); 
          this.router.navigateByUrl('/home');       
          break
        }
      }
    },
    error => {
      this.loginValid = false;  
      console.log("User does not exist or password does not match!")
    });

    if(this.isAuthenticated == false){
      this.loginValid = false;  
    }

  //   this.auth.loginUser(user).subscribe(  
  //     (res: any) => {   
  //       console.log(res)
  //       const response = res;
  //       const userInf = {
  //         username: response.username,
  //         password: this.password,
  //         userId: response.userId,
  //       };
  //       this.data.userInfo = userInf;
  //       console.log("********")
  //       console.log(userInf)
  //       console.log(this.data)
  //       console.log(this.data.getUser())
  //       console.log("********")
  //       this.auth.holdUser(this.data.getUser());
  //       this.router.navigateByUrl('/home');        
  //     },  
  //     error => {  
  //       this.loginValid = false;  
  //       console.log(error)
  //     }  
  //  );   
  }
}
