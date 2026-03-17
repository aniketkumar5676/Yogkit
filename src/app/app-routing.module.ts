import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeViewComponent } from './modules/components/home-view/home-view.component';
import { ContactComponent } from './modules/components/contact/contact.component';
import { YogaCenterComponent } from './modules/components/home-yoga-center/yoga-center.component';
import { AboutComponent } from './modules/components/about/about.component';
import { CorporateYogaComponent } from './modules/components/corporate-yoga/corporate-yoga.component';
import { OnlineYogaComponent } from './modules/components/online-yoga/online-yoga.component';
import { ThreapyYogaComponent } from './modules/components/threapy-yoga/threapy-yoga.component';
import { AdvanceComponent } from './modules/components/advance-yoga/advance.component';
import { MeditationComponent } from './modules/components/meditation/meditation.component';
import { MentorsComponent } from './modules/components/mentors/mentors.component';
import { YogaRetreatComponent } from './modules/components/yoga-retreat/yoga-retreat.component';
import { YoutubeSchedulerComponent } from './modules/components/youtube-scheduler/youtube-scheduler.component';
import { YogaWithPrinceComponent } from './modules/components/yoga-with-prince/yoga-with-prince.component';
import { KidsYogaComponent } from './modules/components/kids-yoga/kids-yoga.component';
import { YogaWellnessWorkshopComponent } from './modules/components/yoga-wellness-workshop/yoga-wellness-workshop.component';
const routes: Routes = [
  { path: '', component: HomeViewComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'home-yoga', component: YogaCenterComponent },
  { path: 'corporate-yoga', component: CorporateYogaComponent },
  { path: 'threapy-yoga', component: ThreapyYogaComponent },
  { path: 'online-yoga', component: OnlineYogaComponent },
  { path: 'advance-yoga', component: AdvanceComponent },
  { path: 'meditation', component: MeditationComponent },
  { path: 'kids-yoga', component: KidsYogaComponent },
  { path: 'mentors', component: MentorsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'yogaretreat/:retreatName', component: YogaRetreatComponent },
  { path: 'schedule', component: YoutubeSchedulerComponent },
  { path: 'yoga-with-prince', component: YogaWithPrinceComponent },
  { path: 'yoga-wellness-workshop', component: YogaWellnessWorkshopComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
