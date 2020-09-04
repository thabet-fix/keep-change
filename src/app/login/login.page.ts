import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { MerchantService } from '../service/merchant.service';
import { Merchant } from '../service/merchant.model';
import { Client } from '../service/client.model';
import { ClientService } from '../service/client.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";
  type: string = "";
  public actualMerchant: Merchant = new Merchant('', 0, '', '', 0);
  public actualClient: Client = new Client('', 0, '', '', 0);
  public merchants: Merchant[];
  idCollection: any;

  constructor(public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public merchantService: MerchantService,
    public clientService: ClientService,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    public storage: Storage
  ) { }

  ngOnInit() {
    this.merchantService.getMerchants().subscribe(
      data => {
        this.merchants = data;
        //console.log(this.merchants); /*TODO*/
      }
    );
  }

  async login() {
    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message: "Please wait...",
      });
      loader.present();
      const { username, password } = this;
      try {
        const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@gmail.com', password);
        //console.log(this.afAuth.auth.currentUser.uid);
        // create user with this id
        this.idCollection = this.afAuth.auth.currentUser.uid;
        console.log(this.idCollection + "jj");
        try {
          this.clientService.getClient(this.idCollection);
        } catch (error) {
          console.log("hi");
        }

        //this.storage.set("user_type", "ok");

        //this.merchantService.addMerchant(this.actualMerchant, this.idCollection);
        //this.navCtrl.navigateRoot(['/tabs']); // CONTINUE HERE GO GO GO
      }
      catch (err) {
        loader.dismiss();

        this.presentAlert("vérifier votre email ou mot de pass");
      }
      loader.dismiss();
    }
  }

  formValidation() {
    if (!this.username) {
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
  logout() {
    //this.afAuth.signOut();
  }
  // segmentChanged(ev: any) {
  //   console.log('Segment changed', ev);
  // }
}
