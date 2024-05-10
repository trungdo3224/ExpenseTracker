import { Text } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';
import { ExpenseContext } from '../store/expense-context';

const AllExpenses = () => {
  const expensesCtx = useContext(ExpenseContext);
  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod='Total'
      fallbackText="No registered expenses found"
    />
  );
};

export default AllExpenses;
