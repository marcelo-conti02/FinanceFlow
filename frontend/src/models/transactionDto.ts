import { TransactionType } from "../enums/transactionType";

export interface TransactionDto {
    // undefined for the creation of a new user
    id: number;
    description: string;
    value: number;
    type: TransactionType;
    userId: number;
  }