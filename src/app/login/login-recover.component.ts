import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { WINDOW } from './login.module';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './login-recover.component.html',
})
export class LoginRecoverComponent implements OnInit {
  
  form: any = {};
  isLoggedIn = false;
  isLoginRecoverFailed = false;
  errorMessage = '';
  roles: string[] = [];
  //periodoCat:any[]=[];
  @ViewChild('successModal') public successModal: ModalDirective;

  constructor(private authService: AuthService,
    private router: Router,
    @Inject(WINDOW) private window: Window
    ) {

    }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let url = this.window.location.protocol +'//'+ this.window.location.hostname + ':' + this.window.location.port;
    this.authService.recoverPass(this.form,url).subscribe(
      data => {
        this.isLoginRecoverFailed = false;
        this.isLoggedIn = true;

        this.successModal.show();
        setTimeout(()=>{ this.successModal.hide(); this.router.navigate(['']); }, 5000)
        //this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginRecoverFailed = true;
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
