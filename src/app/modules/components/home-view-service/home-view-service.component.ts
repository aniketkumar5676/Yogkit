import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { ToastService } from 'angular-toastify';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-home-view-service',
  templateUrl: './home-view-service.component.html',
  styleUrls: ['./home-view-service.component.scss']
})
export class HomeViewServiceComponent implements OnInit{

 
  constructor(private route:Router,private _toastService: ToastService){ }

  navigate(arg0: string) {
    this.route.navigate([arg0],{skipLocationChange:environment.skipURI})
    }
    title:any='Book Yoga Camp';
    targetDate = new Date('2024-06-22T00:00:00');
    currentDate = new Date();
    public contactForm!: any;
    public bookingForm!: any;

    ngOnInit(): void {      
      const timeDifference = this.targetDate.getTime() - this.currentDate.getTime();
      if (timeDifference > 0) {
        this.title='Book Free Yoga Camp'
       }
      
      window.scrollTo(0,0);
      this.contactForm = new FormGroup({
        name: new FormControl(''),
        isd: new FormControl('+91'),
        phoneNumber: new FormControl(''),
        email: new FormControl(''),
        add1: new FormControl(''),
        add2: new FormControl(''),
        message: new FormControl(''),
      });

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
  
    submit(e: Event){   
      e.preventDefault();
      document.getElementById('close-modal')?.click()

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


    submitYogaCamp(){
      document.getElementById('close-modal')?.click()
      emailjs.init({
        publicKey: 'KLMD5aPCP5VyPlTWf',      
      });
      
      emailjs.send("service_dwwlkno","template_n6z6hc3",{
        from_name:  this.bookingForm.get('name').value,
        phone: this.bookingForm.get('isd').value+this.bookingForm.get('phoneNumber').value,
        user_email: this.bookingForm.get('email').value,
        address: this.bookingForm.get('add1').value+this.bookingForm.get('add2').value,
        yogapackage: "Yoga Camp",
        mode: "NA",
        companyname:  'NA',
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
