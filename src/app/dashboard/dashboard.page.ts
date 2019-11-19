import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../interfaces/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationMessages } from '../interfaces/validation-messages';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss', './../app.component.scss'],
})


export class DashboardPage implements OnInit {
  users: Array<User>;
  formUser: FormGroup;
  action: string;
  dataUserEdit: User;
  validationMessages: UserFormValidationMessages;
  constructor(private userService: UserService,
    private loadingService: LoadingService,
    private alertController: AlertController,
    private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.loadingService.showLoader('Load Data...');
    this.initForm();
    this.getUsers();
  }
  doRefresh(event: any) {
    setTimeout(() => {
      this.getUsers();
      event.target.complete();
    }, 2000);
  }
  getUsers(): void {
    this.firebaseService.readUsers().subscribe((resp: any) => {
      this.users = resp.map((register: any) => {
        return {
          id: register.payload.doc.id,
          first_name: register.payload.doc.data().first_name,
          last_name: register.payload.doc.data().last_name,
          email: register.payload.doc.data().email,
          tel: register.payload.doc.data().tel,
          date_of_birth: register.payload.doc.data().date_of_birth
        };
      });
      this.closeForm();
      this.loadingService.hideLoader();
    }, (error) => {
      console.log(error);
      this.userService.getUsers().subscribe((res) => {
        this.users = res.data;
      }, (err) => {
        console.log(err);
      });
    });
  }
  initForm(): void {
    this.formUser = new FormGroup({
      first_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]),
      tel: new FormControl('', [
        Validators.required,
        Validators.pattern(/^3[\d]{9}$/)
      ]),
      date_of_birth: new FormControl('', [
        Validators.required
      ]),
    });
    this.validationMessages = {
      first_name: [
        { type: 'required', message: 'First Name is required.' },
        { type: 'minlength', message: 'First Name must be at least 3 characters long.' }
      ],
      last_name: [
        { type: 'required', message: 'Last Name is required.' },
        { type: 'minlength', message: 'Last Name must be at least 3 characters long.' }
      ],
      email: [
        { type: 'required', message: 'Email is required.' },
        { type: 'pattern', message: `Email isn't correct format` }
      ],
      tel: [
        { type: 'required', message: 'Phone is required.' },
        { type: 'pattern', message: `Phone isn't correct format` }
      ],
      date_of_birth: [
        { type: 'required', message: 'Date of Birth is required.' }
      ]
    };
  }
  createUser(user: User): void {
    this.loadingService.showLoader('Creating user...');
    this.userService.postUser(user).subscribe((res) => {
      this.firebaseService.createUser(user).then((resp: any) => {
          this.loadingService.showAlert('', resp.message);
        this.getUsers();
      })
        .catch(error => {
          console.log(error);
        });
    }, (error) => {
      this.loadingService.showAlert('Error', error.message);
      console.log(error);
    });
  }
  actionForm(user: User): void {
    if (this.action === 'edit') {
      this.updateUser(user);
    } else {
      this.createUser(user);
    }
  }
  editUser(user: User): void {
    this.formUser.controls.first_name.setValue(user.first_name);
    this.formUser.controls.last_name.setValue(user.last_name);
    this.formUser.controls.email.setValue(user.email);
    this.formUser.controls.tel.setValue(user.tel);
    this.formUser.controls.date_of_birth.setValue(user.date_of_birth);
    this.dataUserEdit = user;
    this.action = 'edit';
  }
  clearForm() {
    this.formUser.reset();
  }
  closeForm() {
    this.clearForm();
    this.action = '';
  }
  activateFormCreateUser(): void {
    this.clearForm();
    this.action = 'create';
    this.dataUserEdit = null;
  }
  updateUser(user: User): void {
    this.loadingService.showLoader('Updating user...');
    this.userService.putUser(user, this.dataUserEdit.email).subscribe((res) => {
      this.firebaseService.updateUser(user, this.dataUserEdit.id).then((resp: any) => {
        this.loadingService.showAlert('', resp.message);
        this.getUsers();
      })
        .catch(error => {
          console.log(error);
        });
    }, (error) => {
      this.loadingService.showAlert('Error', error.message);
      console.log(error);
    });
  }
  deleteUser(user: User): void {
    this.loadingService.showLoader('Deleting user...');
    this.userService.deleteUser(user).subscribe((res) => {
      this.firebaseService.deleteUser(user.id).then((resp: any) => {
        this.loadingService.showAlert('', resp.message);
        this.getUsers();
      })
        .catch(error => {
          console.log(error);
        });
    }, (error) => {
      this.loadingService.showAlert('Error', error.message);
      console.log(error);
    });
  }
  async presentAlertConfirmDeleteUser(user: User) {
    const alert = await this.alertController.create({
      header: 'Delete',
      message: `Do you want to delete the user ${user.first_name} ${user.last_name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'confirm',
          handler: () => {
            this.deleteUser(user);
          }
        }
      ]
    });
    await alert.present();
  }
}

export interface UserFormValidationMessages {
  first_name: Array<ValidationMessages>;
  last_name: Array<ValidationMessages>;
  email: Array<ValidationMessages>;
  tel: Array<ValidationMessages>;
  date_of_birth: Array<ValidationMessages>;
}
