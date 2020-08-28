import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}
  devise: string = "€";
  clients : any = [
    {
      "name" : "Jack",
      "solde": 45,
    },
    {
      "name" : "Raoult",
      "solde": 3.8,
    },
    {
      "name" : "Changa",
      "solde": 23,
    },
    {
      "name" : "Mailo",
      "solde": 12,
    },
    {
      "name" : "Fathi",
      "solde": 7,
    },
    {
      "name" : "Amelie",
      "solde": 1.6,
    },
  ]

}
