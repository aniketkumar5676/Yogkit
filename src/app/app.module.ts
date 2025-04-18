import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularToastifyModule, ToastService } from 'angular-toastify'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeViewComponent } from './modules/components/home-view/home-view.component';
import { NavbarComponent } from './modules/components/navbar/navbar.component';
import { ContactComponent } from './modules/components/contact/contact.component';
import { YogaCenterComponent } from './modules/components/home-yoga-center/yoga-center.component';
import { AboutComponent } from './modules/components/about/about.component';
import { HomeView1Component } from './modules/components/home-view1/home-view1.component';
import { HomeViewServiceComponent } from './modules/components/home-view-service/home-view-service.component';
import { WhatsappComponent } from './modules/components/whatsapp/whatsapp.component';
import { FooterComponent } from './modules/components/footer/footer.component';
import { CorporateYogaComponent } from './modules/components/corporate-yoga/corporate-yoga.component';
import { CallUsComponent } from './modules/components/call-us/call-us.component';
import { OnlineYogaComponent } from './modules/components/online-yoga/online-yoga.component';
import { ThreapyYogaComponent } from './modules/components/threapy-yoga/threapy-yoga.component';
import { MeditationComponent } from './modules/components/meditation/meditation.component';
import { AdvanceComponent } from './modules/components/advance-yoga/advance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SliderMenterComponent } from './modules/components/slider-menter/slider-menter.component';
import { MentorsComponent } from './modules/components/mentors/mentors.component';
import { YogaRetreatComponent } from './modules/components/yoga-retreat/yoga-retreat.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    NavbarComponent,
    ContactComponent,
    YogaCenterComponent,
    AboutComponent,
    HomeView1Component,
    HomeViewServiceComponent,
    WhatsappComponent,
    FooterComponent,
    CorporateYogaComponent,
    CallUsComponent,
    OnlineYogaComponent,
    ThreapyYogaComponent,
    MeditationComponent,
    AdvanceComponent,
    SliderMenterComponent,
    MentorsComponent,
    YogaRetreatComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularToastifyModule
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
