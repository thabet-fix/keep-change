import { Component, OnInit } from '@angular/core';
import { Merchant } from '../service/merchant.model';
import { Client } from '../service/client.model';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { MerchantService } from '../service/merchant.service';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public merchantService: MerchantService,
    public clientService: ClientService) { }

  username : string = "";
  password : string = "";
  type : string = "merchant";
  public actualMerchant : Merchant = new Merchant('', 0, '', '', 0);
  public actualClient : Client = new Client('', 0, '', '', 0);
  public merchants: Merchant[];
  idCollection: any;

  ngOnInit() {
  }

  async register() {
    const {username , password, type} = this;
    try{
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username+'@gmail.com', password);
      console.log(this.afAuth.auth.currentUser.uid);
      // create user with this id
      this.idCollection = this.afAuth.auth.currentUser.uid;
      if(type == "merchant"){
        this.merchantService.setConnectedType("merchant");
        this.actualMerchant.companyName = username;    
        this.merchantService.addMerchant(this.actualMerchant, this.idCollection);
      }
      else {
        this.merchantService.setConnectedType("client");
        this.actualClient.name = username;    
        this.clientService.addClient(this.actualClient, this.idCollection);
      }
      
      this.navCtrl.navigateRoot(['/tabs']); // CONTINUE HERE GO GO GO
    }
    catch(err){
      console.log(err);
    }
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
