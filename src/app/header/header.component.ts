import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy {
  // showbar: boolean = true;
  // hidebar: boolean = false;
  micToggle: boolean = false;
  // dropdownToggle:boolean = false
  sideToggle: boolean = true;
  // showImage: boolean= false;
  user: any;
  flag: any;

  constructor(private router:Router, private service :UserService, private logout:AuthService) { }



  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '[]') 
    if ( window.screen.width < 480) {
      $('#mobileButt').removeClass('showI')
      $('#mobileButt').css('height','52px')
      $('#mobileButt').css('width','90px')
    }
    else{
      $('#mobileButt').addClass('showI')
    }
    window.addEventListener('resize', this.resize);

  
    this.checkFlag()

 //   this.closeTab()
  }

  ngOnDestroy(): void {
    
  }

//   @HostListener('window:beforeunload', ['$event'])
// onBeforeUnload(event: BeforeUnloadEvent): void {
//   event.preventDefault();
//   event.returnValue = '';

//   const confirmationMessage = 'Are you sure you want to leave?';
//   if (window.confirm(confirmationMessage)) {
//     this.logOutFun();
//   }
// }
  
  closeTab(){
    window.addEventListener('beforeunload',  (event) => this.closeTabPrompt(event));
  }


  closeTabPrompt(event:any){
    event.preventDefault(); 
    console.log("close tabing")
    event.returnValue = 'Are you sure you want to leave?';
  //  this.logOutFun();
  const message = document.createElement('div');
  message.textContent = 'Are you sure you want to leave?';

  const button = document.createElement('button');
  button.textContent = 'OK';
  button.addEventListener('click', () => {
    this.logOutFun();
  });

  message.appendChild(button);
  
    return event.returnValue;
  }



  resize(){
    if ( window.screen.width < 480) {
      $('#mobileButt').removeClass('showI')
      $('#mobileButt').css('height','52px')
      $('#mobileButt').css('width','90px')
    }else{
      $('#mobileButt').addClass('showI')
    }
  }


  changeFunction(){
    console.log('jjjj')
   
    if (this.micToggle === true) {
      $('#microPhone').removeClass('search-mic2')
      // $('#chat-bar').css('display','none')
  } else if (this.micToggle === false) {
    // $('#micOff').addClass('off-mic')
    $('#microPhone').addClass('search-mic2')
  }
  this.micToggle = !this.micToggle; 
  }


 logOutFun(){
     // Creating a record object with relevant information
  let p = {
    "email": this.user.email,
    "time": this.user.lastlogin,
    "token": this.user.token,
    "action": "logout"
  }
    // Calling the logout API with the record object
  this.logout.logOut(p).subscribe(res =>{
    localStorage.removeItem("sessionId");
    localStorage.removeItem("user");
  
    localStorage.removeItem("token");
    localStorage.removeItem("Avatar");
    this.router.navigate(['/'])
    this.service.currentSharedData.subscribe((res:any) =>{ 
      res.endSession();
       })
  })

 // localStorage.removeItem("sessionId");

}

sideMenu() {

  if (this.sideToggle === true) {
    $('#sidebarMobile').removeClass(' showI')
    $('#mainData').removeClass(' main-content_large')
    $('#mobileButt').css('height','52px')
    $('#mobileButt').css('width','50px')
    // $('#chat-bar').css('display','none')
  } else if (this.sideToggle === false) {
    // $('#micOff').addClass('off-mic')
    $('#sidebarMobile').addClass('showI')
    $('#mainData').addClass(' main-content_large')
    $('#mobileButt').css('height','52px')
    $('#mobileButt').css('width','90px')
  }
  this.sideToggle = !this.sideToggle;
}

profile(){
//  this.router.navigate(['user/profile'])
}

homeButton(){
  this.router.navigate(['user/dashboard'])
}


checkFlag(){
  this.flag = this.user.flag
  if (this.flag == true) {

  } else {
     this.homeButton()
  }
}

}
