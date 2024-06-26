import { createContext, useReducer } from 'react';


export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  setExpense: (expenses) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expenseReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

const ExpenseProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expenseReducer, []);

  const addExpense = (expenseData) => {
    dispatch({ type: 'ADD', payload: expenseData });
  };
  const setExpense = (expenses) => {
    dispatch({ type: 'SET', payload: expenses });
  };
  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  };
  const updateExpense = (id, expenseData) => {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  };
  const value = {
    expenses: expensesState,
    addExpense,
    setExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
