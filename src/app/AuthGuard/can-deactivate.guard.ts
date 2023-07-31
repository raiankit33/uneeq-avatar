import { Injectable } from '@angular/core';
import { CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<any> {

  constructor(private http: HttpClient, private router:Router , private service:AuthService ) {}

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const confirmationMessage = 'Are you sure you want to leave?';
    if (confirm(confirmationMessage)) {
      // Call logout API here
      // Example using Angular's HttpClient:
      return this.logout().then(() => true);
    } else {
      return false;
    }
  }

  logout(): Promise<any> {
    // Code to call logout API
    // Example using Angular's HttpClient:
    return this.http.post('/logout', {}).toPromise();
  }


  logOutFun(){
    var user = JSON.parse(localStorage.getItem('user') || '[]') 
    let p = {
      "email": user.email,
      "time": user.lastlogin,
      "token": user.token
    }
    this.service.logOut(p).subscribe(res =>{
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("Avatar");
      this.router.navigate(['/'])
    })
  //   this.service.currentSharedData.subscribe((res:any) =>{ 
  
  //  res.endSession();
  
  //   })
   // localStorage.removeItem("sessionId");
  
  }

}
