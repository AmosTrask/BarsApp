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
    birthdate: Date;

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
        if(this.getAge(this.birthdate) < 18) {
            let alert = this.alertCtrl.create({
                title: 'You must be over 18',
                subTitle: '',
                buttons: ['OK']
            });
            alert.present();
            return;
        }
        let loading = this.loadingCtrl.create({
            content: 'Waiting for server'
        });
        loading.present();
        this.userService.addUser(this.user).subscribe(() => {
            loading.dismiss();
            this.navCtrl.setRoot(LoginPage);
        },
            (err) => {
                loading.dismiss()
                console.error(err);
                let alert = this.alertCtrl.create({
                    title: 'Sign up failed!',
                    subTitle: err.error.message,
                    buttons: ['OK']
                });
                alert.present();
            });
    }

    getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
}