import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  credentialForm =  this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  login(): void {
    const username = this.credentialForm.get('username')?.value;
    const password = this.credentialForm.get('password')?.value;
    if( username === 'admin' && password === 'admin') {
      localStorage.setItem('user_info', JSON.stringify(this.credentialForm.value));
      this.router.navigate(['dashboard']);
    }
  }

}
