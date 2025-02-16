export interface TransactionDto {
    // undefined for the creation of a new user
    id: number;
    description: string;
    value: number;
    type: number;
    userId: number;
  }