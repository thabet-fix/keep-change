import { Injectable } from '@angular/core';
import { History } from './history.model';

/*********** Angular Fire */
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference} from 'angularfire2/firestore';

import { Observable, of, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { promise } from 'protractor';
import { Client } from './client.model';
/*********** Angular Fire */


@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  historysCol: AngularFirestoreCollection<History>;
  historys: Observable<History[]>;
  

  constructor(private afs: AngularFirestore) {
    
   }
  
   getHistorys(docUser: any, typeUser: string) : Observable<History[]>{
    this.historysCol = this.afs.collection<any>(typeUser).doc(docUser).collection('history', ref => ref.orderBy('dateTransaction'))
    return this.historys = this.historysCol.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as History;
        const id = a.payload.doc.id;        
        return { id, ...data };
      }))
      
    );;
   }

   getHistory(id: any) : Observable<History>{
     return this.historysCol.doc<History>(id).valueChanges().pipe(
      take(1),
       map(history =>{
          history.id = id;
        return history;
       })
     );
   }

   addHistory(typeUser:string, docUser : any, history: History) : Promise<DocumentReference>{
    //return this.historysCol.add(history);
    let historyJSON = JSON.parse(JSON.stringify(history))
        return this.afs.collection(typeUser).doc(docUser).collection<History>('history').add(historyJSON);
   }

   updateHistory(history: History, fieldToUpdate: any) : Promise<void> {
    return this.historysCol.doc(history.id).update(fieldToUpdate);
   }
   
   deleteHistory(id: any) : Promise<void> {
    return this.historysCol.doc(id).delete();
   }

}
