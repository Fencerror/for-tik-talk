import { Component, inject } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { CommonModule } from '@angular/common';
import { SubscriberCardComponent } from "./subscriber-card/subscriber-card.component";
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Profile } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../data/pipes/img-url.pipe';
import { RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  imports: [SvgIconComponent, CommonModule, SubscriberCardComponent, RouterModule, ImgUrlPipe, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  profileService : ProfileService = inject(ProfileService)
  me= this.profileService.me
  subscribers$: Observable<Profile[]> = this.profileService.getSubscribersShortList()
  menuItems: { label: string; icon: string; link: string }[] = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me'
    }, 

    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search'
    },
  ]

  ngOnInit() {
    firstValueFrom(this.profileService.getMe())
  }

}
