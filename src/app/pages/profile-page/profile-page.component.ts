import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Profile } from '../../data/interfaces/profile.interface';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { PostFeedComponent } from "./post-feed/post-feed.component";

@Component({
  standalone: true,
  selector: 'app-profile-page',
  imports: [ProfileHeaderComponent, AsyncPipe, CommonModule, RouterLink, ImgUrlPipe, PostFeedComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  profileService = inject(ProfileService)
  me$= toObservable(this.profileService.me)
  route = inject(ActivatedRoute)

  subscribers$: Observable<Profile[]> = this.profileService.getSubscribersShortList(5)

  profile$:Observable<Profile | null>  = this.route.params
  .pipe(
    switchMap(({id}) =>{
      if(id==='me') return this.me$

      return this.profileService.getAccount(id) 
    })
  )


  
}
