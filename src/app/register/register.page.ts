import { Component, OnInit } from '@angular/core';
import { Merchant } from '../service/merchant.model';
import { Client } from '../service/client.model';
import { NavController, LoadingController, AlertController, } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { MerchantService } from '../service/merchant.service';
import { ClientService } from '../service/client.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public merchantService: MerchantService,
    public clientService: ClientService,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    public storage: Storage) { }

  username: string = "";
  password: string = "";
  type: string = "merchant";
  public actualMerchant: Merchant = new Merchant('', 0, '', '', 0);
  public actualClient: Client = new Client('', 0, '', '', 0);
  public merchants: Merchant[];
  idCollection: any;

  ngOnInit() {
  }

  async register() {
    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message: "Please wait...",
      });
      loader.present();
      const { username, password, type } = this;
      try {
        const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@gmail.com', password);
        console.log(this.afAuth.auth.currentUser.uid);
        // create user with this id
        this.idCollection = this.afAuth.auth.currentUser.uid;
        if (type == "merchant") {
          this.merchantService.setConnectedType("merchant");
          this.actualMerchant.companyName = username;
          this.actualMerchant.id = this.idCollection;
          this.merchantService.addMerchant(this.actualMerchant, this.idCollection);
        }
        else {
          this.merchantService.setConnectedType("client");
          this.actualClient.name = username;
          this.actualClient.id = this.idCollection;
          this.clientService.addClient(this.actualClient, this.idCollection);

        }
        this.storage.set("user_type", type);
        this.navCtrl.navigateRoot(['/tabs']); // CONTINUE HERE GO GO GO
      }
      catch (err) {
        loader.dismiss();
        console.log(err);

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
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
