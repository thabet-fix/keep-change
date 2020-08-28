import { Injectable } from '@angular/core';
import { Merchant } from './merchant.model';

/*********** Angular Fire */
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference} from 'angularfire2/firestore';

import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { promise } from 'protractor';
/*********** Angular Fire */


@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  merchantsCol: AngularFirestoreCollection<Merchant>;
  merchants: Observable<Merchant[]>;
  public isMerchant : boolean ;
  

  constructor(private afs: AngularFirestore) {
    this.merchantsCol = this.afs.collection('merchant');
    // this.merchants = this.merchantsCol.valueChanges();
    
    this.merchants = this.merchantsCol.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Merchant;
        const id = a.payload.doc.id;        
        return { id, ...data };
      }))
      
    );
   }
  
   getMerchants() : Observable<Merchant[]>{
    return this.merchants;
   }

   getMerchant(id: any) : Observable<Merchant>{
     return this.merchantsCol.doc<Merchant>(id).valueChanges().pipe(
       map(merchant =>{
          merchant.id = id;
        return merchant;
       })
     );
   }

   addMerchant(merchant: Merchant, idCollection: any) {
    let merchantJSON = JSON.parse(JSON.stringify(merchant))
    return this.merchantsCol.doc(idCollection).set(merchantJSON);
   }

   updateMerchant(merchant: Merchant, fieldToUpdate) : Promise<void> {
    return this.merchantsCol.doc(merchant.id).update(fieldToUpdate);
   }
   
   deleteMerchant(id: any) : Promise<void> {
    return this.merchantsCol.doc(id).delete();
   }

   setConnectedType(type: string){
     if(type == "merchant"){
       this.isMerchant = true;
     }
     else {
       this.isMerchant = false;
     }
   }

}
