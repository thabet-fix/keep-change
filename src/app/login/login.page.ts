import { AngularFireAuth } from "angularfire2/auth";
import { Component, OnInit } from "@angular/core";
import {
  LoadingController,
  NavController,
  MenuController,
  AlertController,
} from "@ionic/angular";

import { Storage } from "@ionic/storage";
// import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  user = "client";
  password = "";
  email = "";
  constructor(
    public storage: Storage,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private menuCtrl: MenuController,
    private alertController: AlertController
  ) {}
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {}
  change() {
    if (this.user == "client") {
      this.user = "magasin";
    } else {
      this.user = "client";
    }
  }
  async login() {
    if (this.formValidation()) {
      // show loader
      let loader = await this.loadingCtrl.create({
        message: "Please wait...",
      });
      loader.present();
      try {
        await this.afAuth.auth
          .signInWithEmailAndPassword(this.email + "@gmail.com", this.password)
          .then((data) => {
            this.storage.set("usertype", this.user);
            this.navCtrl.navigateRoot("tabs");
          });

        this.presentAlert("verify of your username or password");
      } catch (e) {
        //test
        this.presentAlert("vérifier votre email ou mot de pass");
      }
      loader.dismiss();
    }
  }
  formValidation() {
    if (!this.email) {
      this.presentAlert("Enter user name");
      return false;
    }
    if (!this.password) {
      this.presentAlert("Enter Password");
      return false;
    }
    return true;
  }

  async presentAlert(x: string) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Alert",
      message: x,
      buttons: ["OK"],
    });

    await alert.present();
  }
}
