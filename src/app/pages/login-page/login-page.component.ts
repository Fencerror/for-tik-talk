import { Component, inject, signal, WritableSignal } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/Forms';
import { AuthService } from '../../auth/auth.service';
import { TokenResponse } from '../../auth/auth-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})

export class LoginPageComponent {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  form: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })


  isPasswordVisible:WritableSignal<boolean> = signal<boolean>(false)

  onSubmit(): void {
    console.log(this.form.value);
  
    if (this.form.valid) {
      //@ts-ignore
      this.authService.login(this.form.value)
      .subscribe((res: TokenResponse) => {
        this.router.navigate([''])
        console.log(res)
      })
    }
  }
  
}