import { Component, OnInit } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-helppage',
  templateUrl: './helppage.component.html',
  styleUrls: ['./helppage.component.css']
})
export class HelppageComponent implements OnInit {
  accod1: boolean = false;
  accod2: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  tab1() {
    $('#base-tab11').addClass('active')
    $('#base-tab22').removeClass('active')
    $('#base-tab33').removeClass('active')
    $('#tab11').css('display', 'table')
    $('#tab22').css('display', 'none')
    $('#tab33').css('display', 'none')
  }

  tab2() {
    $('#base-tab22').addClass('active')
    $('#tab22').css('display', 'table')
    $('#tab11').css('display', 'none')
    $('#tab33').css('display', 'none')
    $('#base-tab11').removeClass('active')
    $('#base-tab33').removeClass('active')
  }

  tab3(){
    $('#base-tab33').addClass('active')
    $('#tab33').css('display', 'table')
    $('#base-tab22').removeClass('active')
    $('#base-tab11').removeClass('active')
    $('#tab11').css('display', 'none')
    $('#tab22').css('display', 'none')
  }


  accordQestionhit() {
    if (this.accod1 === true) {
      // If accod1 is true, collapse the accordion panel
      $('#accod1').css('display', 'none')
      $('#accodH1').removeClass('active')
    } else if (this.accod1 === false) {
      // If accod1 is false, expand the accordion panel and collapse other panels
      $('#accod1').css('display', 'block')
      $('#accodH1').addClass('active')
      //
      this.accod2 = false
      $('#accod2').css('display', 'none')
      $('#accodH2').removeClass('active')
    }
    // Toggle the value of accod1
    this.accod1 = !this.accod1
  }

}
