import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { FirebaseAuthenticationService } from '../services/firebase-authentication.service';
import { ValidationMessages } from '../interfaces/validation-messages';
import { LoadingController } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss', './../app.component.scss'],
})

export class LoginPage implements OnInit {
  formLogin: FormGroup;
  errorMessage: string;
  validationMessages: LoginValidationMessages;
  constructor(
    private navCtrl: NavController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private loadingService: LoadingService,
    private authService: FirebaseAuthenticationService
  ) { }

  ngOnInit() {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ])
    });
    this.validationMessages = {
      email: [
        { type: 'required', message: 'Email is required.' },
        { type: 'pattern', message: 'Please enter a valid email.' }
      ],
      password: [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password must be at least 5 characters long.' }
      ]
    };
  }
  async loginUser(value: Login) {
    this.loadingService.showLoader('Validate your credentials...');
    await this.authService.loginUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = '';
        this.navCtrl.navigateForward('/dashboard');
        this.loadingService.hideLoader();
      }, async (err) => {
        this.loadingService.hideLoader();
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Incorrect User/Password',
          buttons: ['OK']
        });
        await alert.present();
        this.errorMessage = err.message;
      });
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }
}
export interface Login {
  email: string;
  password: string;
}
export interface LoginValidationMessages {
  email: Array<ValidationMessages>;
  password: Array<ValidationMessages>;
}
