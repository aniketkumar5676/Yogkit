import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-yoga-retreat',
  styleUrls: ['./yoga-retreat.component.scss'],
  templateUrl: './yoga-retreat.component.html'
})




export class YogaRetreatComponent {

  priceINR = 45000

  features = [
    'Daily Yoga Sessions - Guided Hatha, Vinyasa & Yin',
    'Meditation & Breathwork - Mindful Mornings & Evenings',
    'Nutritious Meals - Healthy Vegetarian Cuisine',
    'Nature Immersion - Hikes, River Walks, Forest Meditation'
  ];

  schedule = [
    '6:30 AM – Sunrise Meditation',
    '7:30 AM – Morning Yoga Flow',
    '9:00 AM – Breakfast',
    '10:00 AM – Workshop / Nature Walk',
    '1:00 PM – Lunch & Rest',
    '4:00 PM – Evening Reflection / Sound Bath',
    '5:30 AM – Sunday Meditation Time',
    '7:00 AM – Afternoon Free'
  ];

  public bookingForm: FormGroup;

  constructor(private router: Router, private _toastService: ToastService, private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      CompanyName: [''],
      isd: ['+91'],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      mode: ['Offline'],
      name: ['', Validators.required]
    });
  }

  navigateToRetreat() {
    this.router.navigate(['/yogaretreat', 'rishiskesh-retreat']);
  }


  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  yogaType:string=''

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
