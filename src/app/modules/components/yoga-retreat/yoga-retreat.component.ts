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

  yogaType:string=''

  public bookingForm: FormGroup;

  programmes: Programme[] = [
    {
      title: 'Color Therapy',
      image: 'assets/image/color-therapy.jpg',
      description: 'Balance body, mind & spirit using the vibrations of color.'
    },
    {
      title: 'Shatkarma',
      image: 'assets/image/shatkarma.jpg',
      description: 'Six yogic detox techniques to cleanse and energize.'
    },
    {
      title: 'Acupressure',
      image: 'assets/image/acupressure.jpg',
      description: 'Gentle point‑pressing to release stress and boost digestion.'
    },
    {
      title: 'Meditation',
      image: 'assets/image/meditation.jpg',
      description: 'Deep‑calm practices for clarity, balance and inner peace.'
    }
  ];

  schedule: DaySchedule[] = [
    {
      day: 1,
      events: [
        'Hawan & Introduction',
        'Mantra Chanting',
        'Yoga Session',
        'Drawing',
        'Tratak',
        'Meditation'
      ]
    },
    {
      day: 2,
      events: [
        'Meditation at Brahma Muhurta',
        'Sunrise Yoga Session',
        'Natural Body Detox',
        'Basti (Shatkarma)',
        'Deep Relaxation with Yoga Nidra',
        'Ganga Aarti'
      ]
    },
    {
      day: 3,
      events: [
        'Music Meditation',
        'Pranayama',
        'Color Therapy',
        'Yoga Dance',
        'Story telling',
        'Closing Ceremony'
      ]
    }
  ];

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
