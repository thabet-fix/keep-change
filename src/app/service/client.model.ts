export class Client {
    public id: any;
    public amount: number;
    public name: string;
    public photo: string;
    public moneyToReceive: number;
  
    constructor(
    id: any, amount: number, name: string, photo: string, moneyToReceive: number) {
    this.id = id;
    this.amount = amount;
    this.name = name;
    this.photo = photo;
    this.moneyToReceive = moneyToReceive;
    }
  } 
  