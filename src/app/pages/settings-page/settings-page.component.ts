import { Component, effect, inject } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { Validators, ReactiveFormsModule, FormBuilder } from '@angular/Forms';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [ProfileHeaderComponent, ReactiveFormsModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  fb = inject(FormBuilder)
  profileService:ProfileService= inject(ProfileService)

  form = this.fb.group({
    firstName: this.fb.control('', Validators.required),
    lastName: this.fb.control('', Validators.required),
    userName: this.fb.control({ value: '', disabled: true }, Validators.required),
    description: this.fb.control(''),
    stack: this.fb.control<string | null>('')
  });
  

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
         //@ts-ignore
        stack: this.mergeStack(this.profileService.me()?.stack)
      })

    });
    
  }

  onSave() {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    if (this.form.valid)return
      
    //@ts-ignore
    firstValueFrom(this.profileService.patchProfile({
      ...this.form.value,
      //@ts-ignore
      stack: this.splitStack(this.form.value.stack ?? '') as string[]


    }))
    
  }

  splitStack(stack: string |null | string[] | undefined):string[] {
    
    if(!stack) return []
    if(Array.isArray(stack))return stack
    return stack.split(',')
  }

  mergeStack(stack: string | null |string[]):string {
    if(!stack) return ''
    if(Array.isArray(stack))return stack.join(',')
    return stack
  }
}
