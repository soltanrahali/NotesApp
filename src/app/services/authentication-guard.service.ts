import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject, Observable } from "rxjs"; 

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGaurd {

    isLoggedInSubject = new BehaviorSubject<boolean>(this.hasInfo());

    constructor(
        private httpClient: HttpClient,
        ){}

    backend: string = environment.backendUrl;

    loginUser(): Observable<any>{
        console.log("Inside the service loginUser")
        return this.httpClient.get('http://localhost:3000/users');
    }

    registerUser(user: any){
       // const url = this.backend + endpoint.REGISTER_USER;
        return this.httpClient.post('http://localhost:3000/users', user,  { responseType: 'json' });
    }

    holdUser(user: any){
        console.log('hold user info in service call ', user)
        localStorage.setItem('userinfo', JSON.stringify(user));
        this.isLoggedInSubject.next(true);
    }

    isUserLoggedIn(): Boolean {
       return true
     
    }

    logoutUser(){
        // const url = this.backend + endpoint.LOGOUT_USER;
        // return this.httpClient.get(url);
    }

    removeUserInfoUpOnLogout(){
        localStorage.removeItem('userinfo');
        this.isLoggedInSubject.next(false);
    }

    private hasInfo(): boolean{
        return !!localStorage.getItem('userinfo');
    }
}