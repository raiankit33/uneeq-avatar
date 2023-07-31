import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { interval, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { UserService } from '../service/user.service';

declare var $: any;



@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit, OnDestroy {



  sideToggle: boolean = false;
  // userText: any
  isSpinner: boolean = true
  user: any = [];
  token: any = '';
  showImage: boolean = false;
  smallSizeImage: boolean = false
  bigSizeImage: boolean = true
  errorStatusCode: boolean = true;

  // timer: any;
  subscription: any;
  checkValue: any;
  flag: boolean = true;
  hideTheAvatarCardOnly: boolean = true;
  hideCardOnly: boolean = false;
  helpFlag : boolean = true ;

  constructor(private router: Router, private service: AuthService, private userSer: UserService,) {

  }





  ngOnInit(): void {
    this.isSpinner = true
    this.user = JSON.parse(localStorage.getItem('user') || '[]')
    this.token = JSON.parse(localStorage.getItem('token') || '{}')

    this.functionCheckForFlag()
    this.functionPresentationFlag()
    //console.log('window', window.screen.width + '*' + window.screen.height  )
    if (window.screen.width < 480) {
      $('#mainData').addClass('main-content_large')
      $('#sidebar').addClass('sidebar_small')
      //  $('#movableCard').addClass('showI')
      $('#movableCard').addClass('mobile_speaking')
      this.smallSizeImage = true
      this.bigSizeImage = false
      $('#sidebar').addClass('showI')    // this is for mobile responsive
      this.showImage = false
    } else {
      $('#mainData').removeClass('main-content_large')
      $('#sidebar').removeClass('sidebar_small')
      $('#movableCard').removeClass('mobile_speaking')
      $('#sidebar').remove('showI')    // this is for mobile responsive
      this.bigSizeImage = true
      this.smallSizeImage = false
      this.showImage = true
    }

    this.startTimer()
    this.checkInternentConnection()

  }

  checkInternentConnection() {
    window.addEventListener("offline", (event) => {
      Swal.fire({
        //position: 'top-end',
        text: 'The internet connection seems to be unstable.',
        showConfirmButton: false,
        timer: 5000
      })
    });
  }


  functionCheckForFlag() {
    this.flag = this.user.flag
    if (this.flag == true) {
          this.helpFlag = true
    } else {
      this.helpFlag = true
      $('#Dashboard').addClass('faded')
      $('#2').addClass('faded')
      $('#3').addClass('faded')
      $('#4').addClass('faded')
      $('#5').addClass('faded')
      $('#6').addClass('faded')
      $('#7').addClass('faded')
      $('#8').addClass('faded')
      $('#9').addClass('faded')
      // $('#10').addClass('faded')
      $('#11').addClass('faded')

      this.navigateToLearning()
    }
  }


  functionPresentationFlag() {
    var view = this.user.Presentation_View
    if (view == "PPT with avatar") {
      this.hideTheAvatarCardOnly = true
      this.hideCardOnly = false
      this.helpFlag = true
    } else if(view == "PPT only" || view == "PPT with audio") {
      this.hideTheAvatarCardOnly = false
      this.hideCardOnly = true 
      this.helpFlag = false
      $('#avatarLoaders').css('display', 'none')
      $('#Dashboard').addClass('faded')
      $('#2').addClass('faded')
      $('#3').addClass('faded')
      $('#4').addClass('faded')
      $('#5').addClass('faded')
      $('#6').addClass('faded')
      $('#7').addClass('faded')
      $('#8').addClass('faded')
      $('#9').addClass('faded')
      $('#10').addClass('faded')
      $('#11').addClass('faded')

      this.navigateToLearning()
    }
  }

  


  ngOnDestroy() {
    // Unsubscribe the timer subscription
    this.subscription.unsubscribe();
  }

  startTimer() {
    var durationInMilliseconds = 2 * 60 * 1000;
    const timer$ = interval(durationInMilliseconds); // 3 minutes = 3000 milliseconds

    // Subscribe to the timer
    this.subscription = timer$.subscribe(() => {
      this.CounterCheck()
    });
  }

  checkAvatarErrorStatus(event: any) {
    if (event == 400) {
      this.errorStatusCode = false
    }
  }



  navigateToLearning() {
    this.checkValue = 'learning'
    this.router.navigate(['/user/learning'])
  }


  navigateToProfile() {
    // this.checkValue = 'profile'
    // this.router.navigate(['/user/profile'])
  }

  navigateToHelp(){
    this.checkValue = 'help'
   this.router.navigate(['/user/help']) 
  }

  click() {
    if (window.screen.width < 480) {
      $('#sidebar').addClass(' sidebar_small')
      $('#sidebarMobile').addClass('showI')
      $('#mainData').addClass('main-content_large')
      $('#mobileButt').css('height', '57px')
      $('#mobileButt').css('width', '90px')
    }
  }




  CounterCheck() {
    let p = {

      "action": "Auto" ,
      "token": "xOBCdlXyG1SYiYUc6KtzzucsHOA",
      "name": "Yash  Test",
      "email": "yash@test.in",
      "time": "2023-07-31,10:48:45"
    
    }
    //console.log('repating....',p)
    this.service.logOut(p).subscribe(res => {

      if (res.statusCode == 401) {

        Swal.fire({
          // title: res.body,
          text: res.body,
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          timer: 6000
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
           this.expiredDataAndAvatar()
          }
        })

        setTimeout(() => {
          this.expiredDataAndAvatar()
        }, 6000)

      }
    })

  }



  logOutFun() {
    let p = {
      "action": "logout",
      "token": "xOBCdlXyG1SYiYUc6KtzzucsHOA",
      "name": "Yash  Test",
      "email": "yash@test.in",
      "time": "2023-07-31,10:48:45"
    
    }
    this.service.logOut(p).subscribe(res => {
      this.expiredDataAndAvatar()
    })

    // localStorage.removeItem("sessionId");

  }


  expiredDataAndAvatar() {
    localStorage.removeItem("sessionId");
    this.service.storedLocalStorageData()
    this.router.navigate(['/'])
    this.userSer.currentSharedData.subscribe((res: any) => {
      res.endSession();
    })
  }

}
