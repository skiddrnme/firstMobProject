import { Expenses } from "./expenses";

export type ExpensesGroup = {
  day: string;
  expenses: Expenses[];
  total: number;
};