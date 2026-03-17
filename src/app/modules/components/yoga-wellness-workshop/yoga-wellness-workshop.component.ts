import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-yoga-wellness-workshop',
  templateUrl: './yoga-wellness-workshop.component.html',
  styleUrls: ['./yoga-wellness-workshop.component.scss']
})
export class YogaWellnessWorkshopComponent implements OnInit {

  workshopForm: FormGroup;

  constructor(private fb: FormBuilder, private _toastService: ToastService) {
    this.workshopForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      orgType: ['', Validators.required],
      orgName: ['', [Validators.required, Validators.minLength(3)]],
      orgAddress: ['', [Validators.required, Validators.minLength(5)]],
      purpose: [''],
      mode: ['', Validators.required]
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  submit() {
    if (this.workshopForm.valid) {
      document.getElementById('close-modal')?.click();
      
      emailjs.init({
        publicKey: 'KLMD5aPCP5VyPlTWf',
      });

      const formValue = this.workshopForm.value;
      const msgStr = `Org Type: ${formValue.orgType}\nPurpose: ${formValue.purpose}`;

      emailjs.send("service_dwwlkno", "template_n6z6hc3", {
        from_name: formValue.name,
        companyname: formValue.orgName,
        phone: formValue.mobileNo,
        user_email: formValue.email,
        address: formValue.orgAddress,
        yogapackage: "Yoga Wellness Workshop",
        mode: formValue.mode,
        sessiontype: "NA",
        message: msgStr,
      }).then(() => {
        this._toastService.success('Workshop Request Sent Successfully!');
        this.workshopForm.reset({
          orgType: '',
          mode: ''
        });
      }).catch((error) => {
        this._toastService.error('Unable to send Request. Please try again.');
      });
    }
  }

}
