import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { ToastService } from 'angular-toastify';

@Component({
    selector: 'app-kids-yoga',
    templateUrl: './kids-yoga.component.html',
    styleUrls: ['./kids-yoga.component.scss']
})
export class KidsYogaComponent implements OnInit {

    public bookingForm!: FormGroup;

    constructor(private _toastService: ToastService) { }

    whatsappNumber = '917217638088';
    whatsappGroupLink = 'https://wa.me/917217638088';
    phoneLink = 'tel:+917217638088';

    benefits = [
        { icon: '🧠', title: 'Better Concentration', desc: 'Yoga helps children improve focus and attention in studies and daily activities.' },
        { icon: '😌', title: 'Calm & Confident Mind', desc: 'Breathing and mindfulness practices help children stay calm and confident.' },
        { icon: '💪', title: 'Strength & Flexibility', desc: 'Yoga poses improve body strength, flexibility, and balance.' },
        { icon: '🧘', title: 'Healthy Posture & Fitness', desc: 'Helps kids maintain correct posture and overall physical fitness.' }
    ];

    journeySteps = [
        { step: '01', title: 'Yoga Basics', desc: 'Kids learn breathing, warm-ups, and posture fundamentals.', icon: '🌱' },
        { step: '02', title: 'Fun Yoga Activities', desc: 'Interactive yoga games and balance exercises.', icon: '🎯' },
        { step: '03', title: 'Advanced Asanas', desc: 'Safe and age-appropriate advanced yoga poses.', icon: '⭐' },
        { step: '04', title: 'Mind & Body Control', desc: 'Improves focus, discipline, and emotional balance.', icon: '🌟' }
    ];

    highlights = [
        { icon: '🌟', text: 'Beginner Friendly' },
        { icon: '🎮', text: 'Fun Yoga Activities' },
        { icon: '💪', text: 'Strength & Flexibility Training' },
        { icon: '🦁', text: 'Confidence Building' },
        { icon: '💻', text: 'Online Live Sessions Available' }
    ];

    visualBenefits = [
        { icon: '🎯', title: 'Better Concentration', color: '#fff3e0' },
        { icon: '🏃', title: 'Improved Posture', color: '#f3e5f5' },
        { icon: '🌿', title: 'Healthy Growth & Flexibility', color: '#e8f5e9' },
        { icon: '✨', title: 'Calm & Confident Personality', color: '#e3f2fd' }
    ];

    openWhatsApp() {
        window.open(this.whatsappGroupLink, '_blank');
    }

    ngOnInit(): void {
        window.scrollTo(0, 0);
        this.bookingForm = new FormGroup({
            parentName: new FormControl('', [Validators.required, Validators.minLength(3)]),
            childNames: new FormControl(''),
            numChildren: new FormControl('1', Validators.required),
            ageGroup: new FormControl('', Validators.required),
            isd: new FormControl('+91'),
            phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
            email: new FormControl('', [Validators.required, Validators.email]),
            add1: new FormControl(''),
            add2: new FormControl(''),
            message: new FormControl('')
        });
    }

    submit() {
        // If close modal exists, trigger it first to hide UI
        document.getElementById('close-modal-kids')?.click()

        emailjs.init({
            publicKey: 'KLMD5aPCP5VyPlTWf',
        });

        // Building address
        const fullAddress = (this.bookingForm.get('add1')?.value + ' ' + this.bookingForm.get('add2')?.value).trim();
        const msgStr = `Parent: ${this.bookingForm.get('parentName')?.value}
Child Name(s): ${this.bookingForm.get('childNames')?.value}
Num Children: ${this.bookingForm.get('numChildren')?.value}
Age Group: ${this.bookingForm.get('ageGroup')?.value}
Additional Message: ${this.bookingForm.get('message')?.value}`;

        emailjs.send("service_dwwlkno", "template_n6z6hc3", {
            from_name: this.bookingForm.get('parentName')?.value,
            companyname: 'NA',
            phone: this.bookingForm.get('isd')?.value + this.bookingForm.get('phoneNumber')?.value,
            user_email: this.bookingForm.get('email')?.value,
            address: fullAddress,
            yogapackage: "Kids Yoga Program",
            mode: 'Offline/Online',
            sessiontype: "NA",
            message: msgStr,
        }).then(() => {
            document.getElementById('close-modal-kids')?.click()
            this._toastService.success('Enrollment Request Sent Successfully!');
            this.bookingForm.reset({ isd: '+91', numChildren: '1' });
        }).catch((error) => {
            document.getElementById('close-modal-kids')?.click()
            this._toastService.error('Unable to send Message');
        });
    }
}
