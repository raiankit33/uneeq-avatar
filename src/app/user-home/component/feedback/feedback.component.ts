import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

declare var $: any;

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  user: any;
  isformActive: boolean = true
  faceValue: any = ""
  isLoading: boolean = false

  @Output() setValue = new EventEmitter<boolean>();

  constructor(private service: UserService, private elementRef: ElementRef, private renderer: Renderer2,) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '[]')
    // this.AuthToken = localStorage.getItem('token')  
  }

  //
  feedbackForm = new FormGroup({
    formData: new FormControl(''),
    face: new FormControl('', Validators.required),
  })

  get face() {
    return this.feedbackForm.controls['face'];
  }


  happyFun(e: any) {
    //  this.faceValue = "Satisfied" 
    const grin = this.elementRef.nativeElement.querySelector('#grin');
    const frown = this.elementRef.nativeElement.querySelector('#frown');
    const meh = this.elementRef.nativeElement.querySelector('#meh');


    this.feedbackForm.get('face')?.setValue(e);
    this.renderer.addClass(grin, 'activate');
    this.renderer.removeClass(frown, 'activate');
    this.renderer.removeClass(meh, 'activate');

  }


  normalFun(e: any) {
    const grin = this.elementRef.nativeElement.querySelector('#grin');
    const frown = this.elementRef.nativeElement.querySelector('#frown');
    const meh = this.elementRef.nativeElement.querySelector('#meh');

    //this.faceValue = "Neutral"
    this.feedbackForm.get('face')?.setValue(e);
    this.renderer.addClass(meh, 'activate');
    this.renderer.removeClass(grin, 'activate');
    this.renderer.removeClass(frown, 'activate');
  }

  sadFun(e: any) {
    const grin = this.elementRef.nativeElement.querySelector('#grin');
    const frown = this.elementRef.nativeElement.querySelector('#frown');
    const meh = this.elementRef.nativeElement.querySelector('#meh');

    // this.faceValue = "Unhappy"
    this.feedbackForm.get('face')?.setValue(e);
    this.renderer.addClass(frown, 'activate');
    this.renderer.removeClass(meh, 'activate');
    this.renderer.removeClass(grin, 'activate');
   
  }

  counter(value: any) {
    this.faceValue = value
    console.log(this.faceValue)
  }

  // activate  validation on submit
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  submitForm() {
    // this.isformActive = false
    if (this.feedbackForm.valid) {
      let payload = {
        "emoji": this.feedbackForm.value.face,
        "feedback": this.feedbackForm.value.formData,
        "name": "Yash  Test",
        "email": "yash@test.in",
        "time": "2023-07-31,10:48:45"
      
      }
      this.isLoading = true
      this.service.feedbackForm(payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.isformActive = false
          this.feedbackForm.reset()
          this.isLoading = false
        } else {
          this.isLoading = false
        }

      })
    } else {
      this.validateAllFormFields(this.feedbackForm);
    }
  }

  cancelForm() {
    var b: boolean = false
    this.setValue.emit(b);
  }
}
