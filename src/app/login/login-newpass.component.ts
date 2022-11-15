import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './login-newpass.component.html',
})
export class LoginNewPassComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginNewPassFailed = false;
  errorMessage = '';
  roles: string[] = [];
  token:string;

  @ViewChild('successModal') public successModal: ModalDirective;

  constructor(private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) {
      this.activatedRoute.queryParams.subscribe(params => {
        this.token = params['token'];
      });
    }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    this.authService.generarpassword(this.form.username,this.form.password,this.form.passwordconfirm,this.token).subscribe(
      data => {
          this.isLoginNewPassFailed = false;
          this.isLoggedIn = true;
          this.successModal.show();
          setTimeout(()=>{ this.successModal.hide(); this.router.navigate(['']); }, 2000)
        
        //this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginNewPassFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  logout(): void {
    window.location.reload();
  }
}

