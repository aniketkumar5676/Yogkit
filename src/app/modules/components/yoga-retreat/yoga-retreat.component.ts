import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { ToastService } from 'angular-toastify';


interface Programme {
  title: string;
  image: string;
  description: string;
}

interface DaySchedule {
  day: number;
  events: string[];
}


@Component({
  selector: 'app-yoga-retreat',
  styleUrls: ['./yoga-retreat.component.scss'],
  templateUrl: './yoga-retreat.component.html'
})





export class YogaRetreatComponent implements OnInit {

  priceINR = 45000

  public bookingForm: FormGroup;

  constructor(private router: Router, private _toastService: ToastService, private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      CompanyName: [''],
      isd: ['+91'],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      add1: new FormControl(''),
      add2: new FormControl(''),
      mode: ['Offline'],
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  navigateToRetreat() {
    this.router.navigate(['/yogaretreat', 'rishiskesh-retreat']);
  }


  ngOnInit(): void {
    window.scrollTo(0, 0);
  }



  updateForm(type:string){
   this.yogaType=type;
  }

  get phoneNumber() {
    return this.bookingForm.get('phoneNumber');
  }

  submit(){
    if (this.bookingForm.invalid) {
      this._toastService.error('Please fill out the form correctly.');
      return;
    }

    document.getElementById('close-modal')?.click()

    emailjs.init({
      publicKey: 'KLMD5aPCP5VyPlTWf',      
    });
    emailjs.send("service_dwwlkno","template_n6z6hc3",{
      from_name:  this.bookingForm.get('name')!.value,
      companyname:  this.bookingForm.get('CompanyName')!.value,
      phone: this.bookingForm.get('isd')!.value+this.bookingForm.get('phoneNumber')!.value,
      user_email: this.bookingForm.get('email')!.value,
      address: this.bookingForm.get('add1')!.value+this.bookingForm.get('add2')!.value,
      yogapackage: this.yogaType,
      mode: this.bookingForm.get('mode')!.value,
      sessiontype: "NA",   
      }).then(()=>{
        document.getElementById('close-modal')?.click()
        this._toastService.success('Message Sent');
      }).catch((error)=>{
        document.getElementById('close-modal')?.click()
        this._toastService.error('Unable to send Message');
      });;

  }
  
}
