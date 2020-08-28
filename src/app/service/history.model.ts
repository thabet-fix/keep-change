export class History {
    public id : any;
    public idMerchant: any;
    public idClient: any;
    public nameMerchant: string;
    public nameClient: string;
    public photoMerchant: string;
    public photoClient: string;
    public amount: number;
    public dateTransaction: Date;
    public dateUpdate: Date;
    public status: boolean;
  
    constructor(
    id: any, idMerchant: any, idClient: any, nameMerchant: string, nameClient: string, photoMerchant: string,
    photoClient: string, amount: number, dateTransaction: Date, dateUpdate: Date, status: boolean) {
    this.id = id;
    this.idMerchant = idMerchant;
    this.idClient = idClient;
    this.nameMerchant = nameMerchant;
    this.nameClient = nameClient;
    this.photoMerchant = photoMerchant;
    this.photoClient = photoClient;
    this.amount = amount;
    this.dateTransaction = dateTransaction;
    this.dateUpdate = dateUpdate;
    this.status = status;
    }
  } 
  