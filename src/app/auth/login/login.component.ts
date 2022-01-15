import { Component, OnInit } from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  loginUser() {
    if (this.loginForm.invalid) return;

    Swal.showLoading();
    const { email, password } = this.loginForm.value;

    this.authService
      .loginUser(email, password)
      .then(() => {
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch((err) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: err.message,
        });
      });
  }
}
