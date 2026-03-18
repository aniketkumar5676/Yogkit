import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{


  public contactForm!: any;
  constructor(private _toastService: ToastService){

  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      isd: new FormControl('+91'),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      add1: new FormControl(''),
      add2: new FormControl(''),
      message: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  yogaType:string=''

  updateForm(type:string){
   this.yogaType=type;
  }

  submit(e: Event){   
    document.getElementById('close-modal')?.click()
    e.preventDefault();

    emailjs.init({
      publicKey: 'KLMD5aPCP5VyPlTWf',      
    });
 
    emailjs.send("service_dwwlkno","template_dmd3eny",{
      from_name: this.contactForm.get('name').value,
      phone: this.contactForm.get('isd').value+this.contactForm.get('phoneNumber').value,
      user_email: this.contactForm.get('email').value,
      address: this.contactForm.get('add1').value+this.contactForm.get('add2').value,
      message: this.contactForm.get('message').value,     
       }).then(()=>{
        document.getElementById('close-modal')?.click()
        this._toastService.success('Message Sent');
      }).catch((error)=>{
        document.getElementById('close-modal')?.click()
        this._toastService.error('Unable to send Message');
      });;
    }
    
    
  }


