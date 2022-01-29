import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LoginService } from '../../../login/services/login.service';
import { AuthService } from '../../../_services/auth.service';
import { TokenStorageService } from '../../../_services/token-storage.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})

export class LoginModalComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  @ViewChild('basicModal') basicModal: ModalDirective;
  

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private loginService: LoginService,
    ) {

    }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

    /*for(let i=2020;i<=new Date().getFullYear();i++)
      this.periodoCat.push({id:i,descripcion:i});*/
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        //this.tokenStorage.savePeriodo(this.form.periodo)

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        //this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  // open modal
  open(idItem: string):  void {
    


    this.basicModal.show();
  }


  // close modal
  close(): void {
      this.basicModal.hide();
  }

}
