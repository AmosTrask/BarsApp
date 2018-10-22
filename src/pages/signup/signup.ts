import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { User } from "../../entities/user";
import { UserService } from "../../services/user.service";
import { LoginPage } from '../login/login';

@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {

    passwordVerification;
    user = new User();

    constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService,
        public alertCtrl: AlertController, public loadingCtrl: LoadingController) { }

    ionViewDidLoad() { }

    signup() {
        if (this.user.password != this.passwordVerification) {
            let alert = this.alertCtrl.create({
                title: 'Passwords not identicals',
                subTitle: '',
                buttons: ['OK']
            });
            alert.present();
            return;
        }
        let loading = this.loadingCtrl.create({
            content: 'Waiting for server'
          });
        this.userService.addUser(this.user).subscribe(() => {
            loading.dismiss();
            this.navCtrl.setRoot(LoginPage);
        },
            (err) => {
                console.error(err);
                let alert = this.alertCtrl.create({
                    title: 'Sign up failed!',
                    subTitle: err.error.message,
                    buttons: ['OK']
                });
                alert.present();
            });
    }

}