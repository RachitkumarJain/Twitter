import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  form: FormGroup;
  private authSub: Subscription;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)]
      })
    });
    this.authSub = this.authService.getAuthStatusListener().subscribe(isAuth => {
      this.isLoading = false;
    })
  }

  onLogin() {
    if(this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(this.form.value.email, this.form.value.password);
    this.form.reset();
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
