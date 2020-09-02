import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { MerchantService } from '../service/merchant.service';
import { Merchant } from '../service/merchant.model';
import { Client } from '../service/client.model';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username : string = "";
  password : string = "";
  type : string = "";
  public actualMerchant : Merchant = new Merchant('', 0, '', '', 0);
  public actualClient : Client = new Client('', 0, '', '', 0);
  public merchants: Merchant[];
  idCollection: any;

  constructor(public navCtrl: NavController,
     public afAuth: AngularFireAuth,
     public merchantService: MerchantService,
     public clientService: ClientService
     ) { }

  ngOnInit() {
    this.merchantService.getMerchants().subscribe(
      data => {
        this.merchants = data;
        console.log (this.merchants); /*TODO*/
      }
    );
  }

  async login() {
    const {username , password } = this;
    try{
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username+'@gmail.com', password);
      console.log(this.afAuth.auth.currentUser.uid);
      // create user with this id
      this.idCollection = this.afAuth.auth.currentUser.uid;
      
      
      //this.merchantService.addMerchant(this.actualMerchant, this.idCollection);
      this.navCtrl.navigateRoot(['/tabs']); // CONTINUE HERE GO GO GO
    }
    catch(err){
      console.log(err);
    }
    
  }

  
  logout() {
    //this.afAuth.signOut();
  }

}
