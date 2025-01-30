import { Component, inject } from '@angular/core';
import {ReactiveFormsModule, FormBuilder } from '@angular/Forms';
import { ProfileService } from '../../../data/services/profile.service';
import { switchMap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent {
  fb = inject(FormBuilder);
  profileService: ProfileService = inject (ProfileService);
  searchForm = this.fb.group({
    firstName:[''],
    lastName: [''],
    stack:[''],
  })

  constructor() {
    this.searchForm.valueChanges
    .pipe(
      switchMap((formValue) =>{
        return this.profileService.filterProfiles(formValue)
      })
    )
    .subscribe()
  }
}
