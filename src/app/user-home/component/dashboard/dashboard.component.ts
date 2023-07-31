import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  fullScreen: boolean = false;
  user: any = [];
  // isSpinner: boolean = true

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '[]')
    if(this.user.flag == false){
      this.router.navigate(['/user/learning'])
    }
    // setTimeout(() => {

    //   this.isSpinner = false
    // }, 3000)
  }

  micFunction(x: any) {
    console.log('hhhhh')
    $('#micCLick').addClass('off-mix')
    x.classList.toggle("off-mic");
  }

  toggle_visibility(b: any) { }

  onLoadCard() {
    this.fullScreen = !this.fullScreen
    // document.getElementById("check").className = "MyClass";
  }

  tab1() {
    $('#base-tab1').addClass('active')
    $('#base-tab2').removeClass('active')
    $('#tab1').css('display', 'table')
    $('#tab2').css('display', 'none')
  }

  tab2() {
    $('#base-tab2').addClass('active')
    $('#tab2').css('display', 'table')
    $('#tab1').css('display', 'none')
    $('#base-tab1').removeClass('active')
  }



  openTestSeries() {
    this.router.navigate(['/user/testseries'])
  }
}
