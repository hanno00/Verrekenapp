export interface Person {
  name: string;
  totalAmount: number;
  id: number;
}

export interface Payment {
  payer: string;
  amount: number;
  receiver: string;
}

export interface Expense {
  name: string;
  amount: number;
}
