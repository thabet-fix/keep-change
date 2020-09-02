import { Component } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';


/*********** Angular Fire */
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MerchantService } from '../service/merchant.service';
import { ClientService } from '../service/client.service';
import { database } from 'firebase';
import { Merchant } from '../service/merchant.model';
import { Client } from '../service/client.model';
import { History } from '../service/history.model';
/*********** Angular Fire */

import { AlertController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { HistoryService } from '../service/history.service';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({ 
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})




export class Tab2Page {
  public myAngularxQrCode: string = null;
  merchantAccount : boolean = false;
  showCamera : boolean = false;
  idMerchant : string = "0";
  
  private merchants : Merchant[];
  private merchant : Merchant;
  private actualMerchant : Merchant;
  moneyToReceive: number = null;
  clientUpdated: boolean;
  private actualClient : Client;

  private history : History = new History('','','',
  '','','','',99, undefined, undefined,true);
  
   
  ngOnInit() {
    
    this.merchantService.getMerchants().subscribe(
      data => {
        this.merchants = data;
      }
    );

    this.merchantService.getMerchant(this.afAuth.auth.currentUser.uid).subscribe(
      data => {
        this.myAngularxQrCode = data.id;
        this.merchant = data;
      }
    )
  }

  constructor( 
    private qrScanner: QRScanner, 
    private afs: AngularFirestore, 
    private merchantService : MerchantService,
    private clientService : ClientService,
    private historyService : HistoryService,
    public alertController: AlertController, 
    public afAuth: AngularFireAuth
    ) {
    // this.myAngularxQrCode = "test";
  }

  scanCode() {
    this.showCamera = true;
    // Optionally request the permission early
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // start scanning
        console.log('Scan en cours...' + JSON.stringify(status));
        const scanSub = this.qrScanner.scan().subscribe((text: any) => {
          console.log('Scanned something', text.result);
          this.idMerchant = text.result;
          this.receiveMoney();
          this.qrScanner.hide(); // hide camera preview
          scanSub.unsubscribe(); // stop scanning
          this.showCamera = false;
        });
      } else if (status.denied) {
        // camera permission was permanently denied
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => console.log('Error is', e));
  }

  scanCodeTest(){
    this.idMerchant = this.afAuth.auth.currentUser.uid;
    this.receiveMoney();
  }

  closeCamera() {
    this.showCamera = false;
    this.qrScanner.hide(); // hide camera preview
    this.qrScanner.destroy();
  }

  receiveMoney(){
    /*to
    si argent existe chez le commerçant (moneyToSend != null)
      si le delais d'attente ne dépasse pas 1min
        reinitialise le moneyToSend à null
        ajoute l'argent dans table client sous merchant(verif la ref)
        ajoute l'argent dans table balance sous client (fait ref a merchant)
        envoyer une notification au merchant (portant le nom du client + bouton annuler) et au client
      sinon
        reinitialise le moneyToSend à null 
        envoyer une notification d'échec au merchant + client
    sinon
      envoyer une notification d'échec au client (fraude!) 

    */
    // maj compte client
    // maj compte merchant


    this.merchantService.getMerchant(this.idMerchant).subscribe(
      data => {
        if( data.moneyToSend !== 0 ){
          this.moneyToReceive = data.moneyToSend;
          this.actualMerchant = data;
          console.log('hello');
        }
      }
    );
    let x = 0;
    this.clientService.getClient("u48o31mxPhFuuPH8LNbI").subscribe( //id Current Client
      dataClient => {
        this.actualClient = dataClient;
        console.log(this.moneyToReceive);
        
        if((this.moneyToReceive) && (this.moneyToReceive!==0)){
          this.clientService.updateClient(this.actualClient, {moneyToReceive : this.moneyToReceive})
          .then(
            () => {
              this.actualClient.moneyToReceive = this.moneyToReceive;
              this.moneyToReceive = 0;
              console.log("Le client à reçu l'argent, send notification to client");
              this.clientUpdated = true;
              this.history.idClient = this.actualClient.id;
              this.history.idMerchant = this.actualMerchant.id;
              this.history.nameClient = this.actualClient.name;
              this.history.nameMerchant = this.actualMerchant.companyName;
              this.history.amount = this.actualClient.moneyToReceive;
              this.history.dateTransaction = new Date();
              this.history.dateUpdate = new Date();
              this.history.photoClient = this.actualClient.photo;
              this.history.photoMerchant = this.actualMerchant.photo;
              this.historyService.addHistory('client','u48o31mxPhFuuPH8LNbI',this.history);//firebase.auth().currentUser.uid
              this.presentAlert();
            }
          );
          
        }   

      }
    );
    

    /* ajouter après notif ! */
    
  }
  updateMerchant() {
    if(this.moneyToReceive == 0){
      this.merchantService.updateMerchant(this.actualMerchant, {moneyToSend : 0})
      .then(
        () => {
          this.historyService.addHistory('merchant',this.afAuth.auth.currentUser.uid,this.history);
          console.log("Le client à reçu l'argent, send notification to merchant");
          if(this.merchantAccount){
            /* notifier le merchant */
          }
        }
      );/*TODO - continue*/
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: this.actualMerchant.companyName,
      subHeader: 'just sent you',
      message: this.actualClient.moneyToReceive+" $",
      buttons: ['OK']
    });

    await alert.present();
    this.updateMerchant();
  }
  
  
}
