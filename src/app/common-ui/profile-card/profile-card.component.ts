import { Component, Input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../data/pipes/img-url.pipe';

@Component({
  selector: 'app-profile-card',
  standalone: true, 
  imports: [ImgUrlPipe], 
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'] 
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
}
