import { Injectable } from '@angular/core';
import { Client } from './client.model';

/*********** Angular Fire */
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference} from 'angularfire2/firestore';

import { Observable, of, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { promise } from 'protractor';
/*********** Angular Fire */


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCol: AngularFirestoreCollection<Client>;
  clients: Observable<Client[]>;
  

  constructor(private afs: AngularFirestore) {
    this.clientsCol = this.afs.collection('client');
    // this.clients = this.clientsCol.valueChanges();
    
    this.clients = this.clientsCol.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;        
        return { id, ...data };
      }))
      
    );
   }
  
   getClients() : Observable<Client[]>{
    return this.clients;
   }

   getClient(id: any) : Observable<Client>{
     return this.clientsCol.doc<Client>(id).valueChanges().pipe(
      take(1),
       map(client =>{
          client.id = id;
        return client;
       })
     );
   }

   addClient(client: Client, idCollection: any) {
    let clientJSON = JSON.parse(JSON.stringify(client))
    return this.clientsCol.doc(idCollection).set(clientJSON);
   }

   updateClient(client: Client, fieldToUpdate: any) : Promise<void> {
    return this.clientsCol.doc(client.id).update(fieldToUpdate);
   }
   
   deleteClient(id: any) : Promise<void> {
    return this.clientsCol.doc(id).delete();
   }

}
