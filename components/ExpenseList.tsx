import React, { useState } from "react";
import { FlatList } from "react-native";
import { ExpenseRow } from "./ExpenseRow";
import { Expenses } from "../types/expenses";
import { ExpensesGroup } from "../types/expense-group";

type Props = {
  groups: ExpensesGroup[];
};

export const ExpenseList = ({ expenses }) => {
  // Метод для добавления нового расхода

  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => <ExpenseRow item={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};
