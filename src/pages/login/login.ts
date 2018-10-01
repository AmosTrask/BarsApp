import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {LoginService} from '../../services/login.service';
import {LoginInfos} from '../../entities/loginInfos';
import {TabsPage} from '../tabs/tabs';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginInfos: LoginInfos = {
    username: "",
    password: ""
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginService,
              public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
  }

  /**
   * Try to log
   */
  login() {
    let loading = this.loadingCtrl.create({
      content: 'Updating data'
    });
    loading.present();
    this.loginService.login(this.loginInfos).subscribe(() => {
            loading.dismiss();
            this.navCtrl.setRoot(TabsPage);
      },
      (err) => {
        loading.dismiss();
        console.error(err);
        let message;
        if (err.status == 0) {
          message = 'Unable to reach the server';
        } else {
          message = err.error;
        }
        let alert = this.alertCtrl.create({
          title: 'Connection failed',
          buttons: ['OK']
        });
        alert.present();
      });
  }

  /**
   * Go to RegistrationPage
   */
  /*createAccount() {
    this.navCtrl.push(RegistrationPage);
  }*/
}
