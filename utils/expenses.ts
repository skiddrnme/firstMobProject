import { format, isThisYear, isToday, isYesterday } from 'date-fns';
import { calculateRange } from './date';
import { Recurrence } from '../types/recurrence';
import { ExpensesGroup } from '../types/expense-group';
import { useSelector } from 'react-redux';
import { selectExpenses } from '../store/slices/expensesSlice';
import { Expenses } from '../types/expenses';
export const filterExpensesInPeriod = (
  expenses: Expenses[],
  period: Recurrence,
  periodIndex: number
) => {
  const { start, end } = calculateRange(period, periodIndex);

  return expenses.filter((expense) => {
    const { date } = expense;
    return date >= start && date <= end;
  });
};

export const groupExpensesByDay = (expenses: Expenses[]): ExpensesGroup[] => {
  const groupedExpenses: { [key: string]: Expenses[] } = {};

  expenses.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  expenses.forEach((expense) => {
    const { date } = expense;
    let key = '';
    if (isToday(date)) {
      key = 'Today';
    } else if (isYesterday(date)) {
      key = 'Yesterday';
    } else if (isThisYear(date)) {
      key = format(date, 'E, d MMM');
    } else {
      key = format(date, 'E, d MMM yyyy');
    }

    if (!groupedExpenses[key]) {
      groupedExpenses[key] = [];
    }

    groupedExpenses[key].push(expense);
  });

  return Object.keys(groupedExpenses).map((key) => ({
    day: key,
    expenses: groupedExpenses[key],
    total: groupedExpenses[key].reduce(
      (acc, expense) => acc + expense.amount,
      0
    ),
  }));
};

export const useFilteredAndGroupedExpenses = (recurrence: Recurrence) => {
  const expenses = useSelector(selectExpenses);
  const filteredExpenses = filterExpensesInPeriod(expenses, recurrence, 0);
  return groupExpensesByDay(filteredExpenses);
};

export const getAverageAmountInPeriod = (total: number, period: Recurrence) => {
  switch (period) {
    case Recurrence.Weekly:
      return total / 7;
    case Recurrence.Monthly:
      return total / 30;
    case Recurrence.Yearly:
      return total / 365;
    default:
      return total;
  }
};
