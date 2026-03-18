import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import emailjs from '@emailjs/browser';
import { ToastService } from 'angular-toastify';
import { Router } from '@angular/router';

// Import the config file directly
import configData from '../../../../schedule-config.json';

@Component({
  selector: 'app-youtube-scheduler',
  templateUrl: './youtube-scheduler.component.html',
  styleUrls: ['./youtube-scheduler.component.scss']
})
export class YoutubeSchedulerComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  currentClassIndex = 0;
  rating = 0;
  feedbackText: string = '';
  showFeedback = false;
  safeEmbedUrl: SafeResourceUrl | null = null;

  // Video controls
  isMuted = false;
  isCameraOn = false;
  isFullscreen = false;

  // Form properties
  bookingForm: FormGroup;
  timeSlots: string[] = ['6 am', '7 am', '8 am', '5 pm', '6 pm', '7 pm'];

  // Configuration data
  config: any = configData;
  classes: any[] = [];

  get currentClass() {
    return this.classes[this.currentClassIndex] || null;
  }

  constructor(
    private sanitizer: DomSanitizer,
    private toastService: ToastService,
    private router: Router
  ) {
    this.bookingForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(100)]),
      isd: new FormControl('+91'),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      alternativeNumber: new FormControl('', [Validators.pattern('^[0-9]{10}$|^$')]), // Optional with validation
      city: new FormControl('', [Validators.required]),
      purpose: new FormControl(''), // Optional
      preferredBatch: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loadConfiguration();
  }

  loadConfiguration() {
    try {
      // Use the imported config data
      this.config = configData;
      this.classes = configData.currentClasses || [];
      this.updateVideoUrl();

      // Auto-trigger modal on page load if configured
      if (this.config?.modal?.autoShow) {
        const delay = this.config.modal.autoShowDelay || 1000;
        setTimeout(() => {
          this.showModal();
        }, delay);
      }
    } catch (error) {
      console.error('Error loading configuration:', error);
      // Fallback to default data
      this.loadDefaultConfiguration();
    }
  }

  loadDefaultConfiguration() {
    this.config = {
      header: {
        title: '🎯 Live Yoga Studio',
        subtitle: 'Join interactive sessions with Prince Yog Guru'
      },
      schedule: {
        title: 'Daily Class Schedule',
        batches: {
          morning: {
            title: '🌅 Morning Batch',
            timings: [
              { time: '6:00 AM', duration: '45-60 min' },
              { time: '7:00 AM', duration: '45-60 min' },
              { time: '8:00 AM', duration: '45-60 min' }
            ]
          },
          evening: {
            title: '🌆 Evening Batch',
            timings: [
              { time: '5:00 PM', duration: '45-60 min' },
              { time: '6:00 PM', duration: '45-60 min' },
              { time: '7:00 PM', duration: '45-60 min' }
            ]
          }
        }
      },
      classInfo: {
        title: '📋 Class Information',
        details: [
          { label: 'Duration', value: '45-60 minutes per session' },
          { label: 'Level', value: 'All Levels Welcome' },
          { label: 'Instructor', value: 'Prince Yog Guru' }
        ]
      },
      modal: {
        title: 'Join free yoga session',
        autoShow: true,
        autoShowDelay: 1000,
        submitButton: {
          text: 'Join Free Session'
        },
        successMessage: 'Registration successful! We\'ll contact you shortly.',
        errorMessage: 'Unable to process registration. Please try again.'
      }
    };
    this.classes = [
      {
        title: 'Morning Yoga Flow',
        time: '07:00 AM',
        description: 'Start your day with an energizing yoga session.',
        youtubeId: 'dQw4w9WgXcQ'
      },
      {
        title: 'Evening Relaxation',
        time: '06:00 PM',
        description: 'Wind down with gentle stretching and meditation.',
        youtubeId: 'dQw4w9WgXcQ'
      }
    ];
    this.updateVideoUrl();

    // Auto-trigger modal on page load
    setTimeout(() => {
      this.showModal();
    }, 1000);
  }

  getSafeEmbedUrl(youtubeId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + youtubeId + '?autoplay=1&mute=0');
  }

  updateVideoUrl() {
    if (this.currentClass && this.currentClass.youtubeId) {
      this.safeEmbedUrl = this.getSafeEmbedUrl(this.currentClass.youtubeId);
    }
  }

  showModal() {
    // Trigger the Bootstrap modal
    const modal = document.getElementById('freeYogaModal');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }

  // Video controls
  toggleMute() {
    this.isMuted = !this.isMuted;
  }

  toggleCamera() {
    this.isCameraOn = !this.isCameraOn;
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
    // In a real app, you'd implement actual fullscreen functionality
  }

  toggleQuality() {
    // In a real app, you'd implement quality selection
    console.log('Quality toggle clicked');
  }

  joinClass() {
    if (this.currentClass?.youtubeId) {
      window.open('https://www.youtube.com/watch?v=' + this.currentClass.youtubeId, '_blank');
    }
  }

  shareClass() {
    if (navigator.share) {
      navigator.share({
        title: this.currentClass?.title || 'Yoga Class',
        text: this.currentClass?.description || 'Join this yoga class!',
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      this.toastService.success('Link copied to clipboard!');
    }
  }

  selectClass(index: number) {
    this.currentClassIndex = index;
    this.updateVideoUrl();
  }

  // Feedback functionality
  rateClass(stars: number) {
    this.rating = stars;
  }

  submitFeedback() {
    if (this.rating > 0) {
      this.toastService.success('Thank you for your feedback!');
      this.closeFeedback();
      this.rating = 0;
      this.feedbackText = '';
    } else {
      this.toastService.error('Please select a rating');
    }
  }

  closeFeedback() {
    this.showFeedback = false;
  }

  // Quick actions
  addToCalendar() {
    // In a real app, you'd implement calendar integration
    console.log('Add to calendar clicked');
  }

  raiseHand() {
    // In a real app, you'd implement hand raising functionality
    console.log('Hand raised!');
  }

  submit() {
    if (this.bookingForm.valid) {
      document.getElementById('close-modal')?.click();

      emailjs.init({
        publicKey: 'KLMD5aPCP5VyPlTWf',
      });

      // Send email notification
      emailjs.send("service_dwwlkno", "template_n6z6hc3", {
        from_name: this.bookingForm.get('name')?.value,
        companyname: 'NA',
        phone: this.bookingForm.get('isd')?.value + this.bookingForm.get('phoneNumber')?.value,
        alternative_phone: this.bookingForm.get('alternativeNumber')?.value || 'NA',
        user_email: 'NA',
        address: this.bookingForm.get('city')?.value,
        yogapackage: 'Free Yoga Session',
        mode: 'Online/Offline',
        sessiontype: this.bookingForm.get('preferredBatch')?.value,
        message: this.bookingForm.get('purpose')?.value || 'NA',
        age: this.bookingForm.get('age')?.value
      }).then(() => {
        document.getElementById('close-modal')?.click();
        this.toastService.success(this.config?.modal?.successMessage || 'Registration successful! We\'ll contact you shortly.');

        // Reset form and redirect
        this.bookingForm.reset({
          isd: '+91' // Reset with default ISD code
        });
      }).catch((error) => {
        console.error('Email sending failed:', error);
        this.toastService.error(this.config?.modal?.errorMessage || 'Unable to process registration. Please try again.');
      });
    }
  }

  private sendWhatsAppMessages() {
    const formData = this.bookingForm.value;
    const adminNumber = '+917217638088';

    // Create admin message
    const adminMessage = `
Hello! New registration for Free Yoga Session:

*Name:* ${formData.name}
*Age:* ${formData.age}
*WhatsApp:* ${formData.isd}${formData.phoneNumber}
${formData.alternativeNumber ? `*Alternative Number:* ${formData.alternativeNumber}` : ''}
*City:* ${formData.city}
${formData.purpose ? `*Purpose:* ${formData.purpose}` : ''}
*Preferred Batch:* ${formData.preferredBatch}

Thank you!`;

    // Create user message
    const userMessage = `
Thank you for registering for the Free Yoga Session!

Your registration details:
*Name:* ${formData.name}
*Preferred Batch:* ${formData.preferredBatch}

We'll contact you shortly to confirm your registration.

For any queries, feel free to contact us.`;

    // Open WhatsApp links in new tabs
    window.open(`https://wa.me/${adminNumber}?text=${encodeURIComponent(adminMessage)}`, '_blank');
    window.open(`https://wa.me/${formData.isd.replace('+', '')}${formData.phoneNumber}?text=${encodeURIComponent(userMessage)}`, '_blank');
  }
}
