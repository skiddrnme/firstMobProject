import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { theme } from '../theme'
import { Expenses } from '../types/expenses'

type Expense = {
  note: string;
  amount: number;
  category: string;
};

type Props = {
  item: Expense;
};

export const ExpenseRow = ({item}: Props) => {

 

  return (
    <View style={{ display: 'flex', flexDirection: 'column', marginBottom: 12 }}>
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
      }}
    >
      <Text
        style={{
          fontSize: 17,
          fontWeight: '600',
          color: theme.colors.textPrimary,
        }}
      >
        {item.note}
      </Text>
      <Text
        style={{
          fontSize: 17,
          fontWeight: '600',
          color: theme.colors.textPrimary,
        }}
      >
        {item.amount}
      </Text>
    </View>
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: theme.colors.card,
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: theme.colors.primary, fontSize: 13 }}>
          {item.category}
        </Text>
      </View>
      <Text style={{ fontSize: 17, color: theme.colors.textSecondary }}>
        
      </Text>
    </View>
  </View>
  )
}