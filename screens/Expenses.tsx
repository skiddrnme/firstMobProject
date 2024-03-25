import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { ExpenseRow } from "../components/ExpenseRow";

import { Recurrence } from "../types/recurrence";

import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import * as Sentry from "sentry-expo";
import { theme } from "../theme";
import { useSelector } from "react-redux";
import { selectExpenses } from "../store/slices/expensesSlice";
import { ExpenseList } from "../components/ExpenseList";
import { getPlainRecurrence } from "../utils/recurrenses";
import {
  useFilteredAndGroupedExpenses,
  getAverageAmountInPeriod,
} from "../utils/expenses"; // обновлен импорт
type Expense = {
  id: number;
  amount: number;
  date: Date;
  note: string;
  category: string;
};
 const Expenses = () => {
  const expenses = useSelector(selectExpenses);
  const [recurrence, setRecurrence] = React.useState(Recurrence.Weekly);
  const recurrenceSheetRef = useRef<BottomSheet>();
  const groupedExpenses = useFilteredAndGroupedExpenses(recurrence);
  const total = groupedExpenses.reduce((sum, group) => (sum += group.total), 0);
  const averageAmount = getAverageAmountInPeriod(total, recurrence);
  const changeRecurrence = (newRecurrence: Recurrence) => {
    setRecurrence(newRecurrence);
    recurrenceSheetRef.current?.close();
  };
  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
          paddingHorizontal: 16,
          width: "100%",
          paddingTop: 16,
        }}>
        <View
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
          }}>
          <Text style={{ color: theme.colors.textPrimary, fontSize: 17 }}>
            Расходы за
          </Text>
          <TouchableOpacity
            style={{ marginLeft: 16 }}
            onPress={() => recurrenceSheetRef.current?.expand()}>
            <Text style={{ color: theme.colors.primary, fontSize: 17 }}>
              {getPlainRecurrence(recurrence)}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
            marginBottom: 16,
          }}>
          <Text
            style={{
              color: theme.colors.textSecondary,
              fontSize: 17,
              marginTop: 2,
            }}>
            ₽
          </Text>
          <Text
            style={{
              color: theme.colors.textPrimary,
              fontSize: 40,
              fontWeight: "600",
              marginLeft: 2,
            }}>
            {total}
          </Text>
        </View>
        <ExpenseList expenses={expenses} />
      </View>
      
    </>
  );
};

export {Expenses}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    color: "#fff",
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
});
