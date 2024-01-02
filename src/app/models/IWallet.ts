import { IUser } from "./IUser";

export interface IWallet{
    userId?: IUser;
    walletAmount?: number;
    transactions:ITransactions[]
}


export interface ITransactions {
  amount?: number;
  transactionType: string;
  description?: string;
  date?: Date;
}