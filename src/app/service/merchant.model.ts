export class Merchant {
    public id: any;
    public amount: number;
    public companyName: string;
    public photo: string;
    public moneyToSend: number;
  
    constructor(
    id: any, amount: number, companyName: string, photo: string, moneyToSend: number) {
    this.id = id;
    this.amount = amount;
    this.companyName = companyName;
    this.photo = photo;
    this.moneyToSend = moneyToSend;
    }
  } 
  