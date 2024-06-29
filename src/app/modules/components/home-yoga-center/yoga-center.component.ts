import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-yoga-center',
  templateUrl: './yoga-center.component.html',
  styleUrls: ['./yoga-center.component.scss']
})
export class YogaCenterComponent implements OnInit {

  @ViewChild('closeModal') closeModal!: ElementRef
  public bookingForm!: any;
  constructor(private _toastService: ToastService){

  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.bookingForm = new FormGroup({
      name: new FormControl(''),
      isd: new FormControl('+91'),
      phoneNumber: new FormControl(''),
      email: new FormControl(''),
      add1: new FormControl(''),
      add2: new FormControl(''),
      message: new FormControl(''),
    });
  }

  yogaType:string=''

  updateForm(type:string){
   this.yogaType=type;
  }

  submit(){
    document.getElementById('close-modal')?.click()
    emailjs.init({
      publicKey: 'KLMD5aPCP5VyPlTWf',      
    });
    emailjs.send("service_dwwlkno","template_n6z6hc3",{
      from_name:  this.bookingForm.get('name').value,
      companyname:  'NA',
      phone: this.bookingForm.get('isd').value+this.bookingForm.get('phoneNumber').value,
      user_email: this.bookingForm.get('email').value,
      address: this.bookingForm.get('add1').value+this.bookingForm.get('add2').value,
      yogapackage: this.yogaType,
      mode: 'Offline',
      sessiontype: "NA",
      message: this.bookingForm.get('message').value,     
      }).then(()=>{
        document.getElementById('close-modal')?.click()
        this._toastService.success('Message Sent');
      }).catch((error)=>{
        document.getElementById('close-modal')?.click()
        this._toastService.error('Unable to send Message');
      });;



  }
}

