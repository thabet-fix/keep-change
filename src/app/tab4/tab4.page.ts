import { Component } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  constructor() {}
  devise: string = "€";
  labelCompanyName : string = "company name";
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
