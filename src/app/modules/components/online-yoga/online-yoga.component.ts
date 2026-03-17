import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { ToastService } from 'angular-toastify';
import configData from '../../../../schedule-config.json';

@Component({
  selector: 'app-online-yoga',
  templateUrl: './online-yoga.component.html',
  styleUrls: ['./online-yoga.component.scss']
})
export class OnlineYogaComponent implements OnInit {

  public bookingForm!: any;
  public groupYogaBookingForm!: FormGroup;
  public selectedCategory: 'personal' | 'group' | null = null;
  public config: any = configData;
  public selectedScheduleItem: any = null;

  constructor(private _toastService: ToastService){

  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    // Personal Yoga Form (existing)
    this.bookingForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      isd: new FormControl('+91'),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      session: new FormControl('Private', Validators.required),
      add1: new FormControl(''),
      add2: new FormControl(''),
      message: new FormControl(''),
    });

    // Group Yoga Booking Form (from schedule page)
    this.groupYogaBookingForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(100)]),
      isd: new FormControl('+91'),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      alternativeNumber: new FormControl('', [Validators.pattern('^[0-9]{10}$|^$')]),
      city: new FormControl('', [Validators.required, Validators.minLength(3)]),
      purpose: new FormControl(''),
      preferredBatch: new FormControl('', [Validators.required])
    });

    this.loadConfiguration();
  }

  loadConfiguration() {
    try {
      this.config = configData;
    } catch (error) {
      console.error('Error loading configuration:', error);
    }
  }

  selectCategory(category: 'personal' | 'group') {
    this.selectedCategory = category;
    if (category === 'personal') {
      // Scroll to personal yoga section or show packages
      const element = document.getElementById('yoga-packages');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (category === 'group') {
      // Scroll to group yoga schedule
      const element = document.getElementById('group-yoga-schedule');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
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
      mode: 'Online',
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

  // Group Yoga Booking Methods
  openGroupYogaModal(scheduleItem?: any) {
    // Reset form first
    this.resetGroupYogaForm();
    this.selectedScheduleItem = scheduleItem;
    // If schedule item is selected, set preferredBatch and clear required validation
    if (scheduleItem) {
      const batchTime = scheduleItem.batch + ' - ' + scheduleItem.time;
      this.groupYogaBookingForm.patchValue({
        preferredBatch: batchTime
      });
      this.groupYogaBookingForm.get('preferredBatch')?.clearValidators();
      this.groupYogaBookingForm.get('preferredBatch')?.updateValueAndValidity();
    } else {
      // If no schedule item, make preferredBatch required
      this.groupYogaBookingForm.get('preferredBatch')?.setValidators([Validators.required]);
      this.groupYogaBookingForm.get('preferredBatch')?.updateValueAndValidity();
    }
    const modal = document.getElementById('groupYogaModal');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }

  submitGroupYogaBooking() {
    if (this.groupYogaBookingForm.valid) {
      document.getElementById('close-group-modal')?.click();
      
      emailjs.init({
        publicKey: 'KLMD5aPCP5VyPlTWf',
      });

      const scheduleInfo = this.selectedScheduleItem 
        ? `${this.selectedScheduleItem.batch} - ${this.selectedScheduleItem.time} - ${this.selectedScheduleItem.title || ''}`
        : this.groupYogaBookingForm.get('preferredBatch')?.value || 'Group Yoga Session';

      emailjs.send("service_dwwlkno", "template_n6z6hc3", {
        from_name: this.groupYogaBookingForm.get('name')?.value,
        companyname: 'NA',
        phone: this.groupYogaBookingForm.get('isd')?.value + this.groupYogaBookingForm.get('phoneNumber')?.value,
        alternative_phone: this.groupYogaBookingForm.get('alternativeNumber')?.value || 'NA',
        user_email: 'NA',
        address: this.groupYogaBookingForm.get('city')?.value,
        yogapackage: 'Online Group Yoga Session',
        mode: 'Online',
        sessiontype: scheduleInfo,
        message: this.groupYogaBookingForm.get('purpose')?.value || 'NA',
        age: this.groupYogaBookingForm.get('age')?.value
      }).then(() => {
        document.getElementById('close-group-modal')?.click();
        this._toastService.success(this.config?.modal?.successMessage || 'Registration successful! We\'ll contact you shortly.');
        this.resetGroupYogaForm();
      }).catch((error) => {
        console.error('Email sending failed:', error);
        this._toastService.error(this.config?.modal?.errorMessage || 'Unable to process registration. Please try again.');
      });
    }
  }

  resetGroupYogaForm() {
    this.groupYogaBookingForm.reset({
      isd: '+91'
    });
    this.selectedScheduleItem = null;
    // Reset preferredBatch validation
    this.groupYogaBookingForm.get('preferredBatch')?.setValidators([Validators.required]);
    this.groupYogaBookingForm.get('preferredBatch')?.updateValueAndValidity();
  }

  getAllScheduleItems(): any[] {
    const items: any[] = [];
    if (this.config?.schedule?.batches?.morning?.timings) {
      this.config.schedule.batches.morning.timings.forEach((timing: any) => {
        items.push({ ...timing, batch: 'Morning' });
      });
    }
    if (this.config?.schedule?.batches?.evening?.timings) {
      this.config.schedule.batches.evening.timings.forEach((timing: any) => {
        items.push({ ...timing, batch: 'Evening' });
      });
    }
    return items;
  }

  scrollToPackages() {
    const element = document.getElementById('yoga-packages');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}