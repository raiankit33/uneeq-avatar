import { Injectable } from '@angular/core';
import {API} from '../service/restapi';
import {environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }


  getIpAdress(){
     return this.http.get('https://geolocation-db.com/json/')
   // return this.http.get("http://api.ipify.org/?format=json");  
  }


  zoomMeetingConversation(data:any){
    return this.http.post<any>(this.baseUrl+API.conversationSaveData, data);
  } 


  signIn(data:any){
    return this.http.post<any>(this.baseUrl+API.login, data);
  } 

  signUp(data:any){
    return this.http.post<any>(this.baseUrl+API.signUp, data);
  } 
  

  forgetPassword(forget:any){
    return this.http.post<any>(this.baseUrl+API.forget, forget);
  }

  setPasswordTimer(timer:any){
    return this.http.post<any>(this.baseUrl+API.setPasswordTimer, timer);
  }

  setPassword(newPass:any){
    return this.http.post<any>(this.baseUrl+API.setPassword, newPass);
  }

  uneeqAvatar(payload:any){
    return this.http.post<any>(this.baseUrl+API.uneeqAvatarToken,payload);
  }


  unsolidatedResponse(uneeqRes:any){
    return this.http.post('https://1i4zp3969d.execute-api.us-west-2.amazonaws.com/Development/uneeq/unsolicitedResponses',uneeqRes)
  
  }
  

  getProfile(newPass:any){
    return this.http.post<any>(this.baseUrl+API.getProfile, newPass);
  }


  updateProfile(newPass:any){
    return this.http.post<any>(this.baseUrl+API.updateProfile, newPass);
  } 

  changePassword_Profile(newPass:any){
    return this.http.post<any>(this.baseUrl+API.changePassword, newPass);
  }

  logOut(logout:any){
    return this.http.post<any>(this.baseUrl+API.logout, logout);
  }

  
  storedLocalStorageData(){
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("Avatar");
  }

}
