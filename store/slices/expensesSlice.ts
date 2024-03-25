import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [],
  
};

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
  },
});

export const { addExpense } = expensesSlice.actions;

export const selectExpenses = (state) => state.expenses.expenses;

export default expensesSlice.reducer;